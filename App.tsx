import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  CV_DATA, 
  SKILLS, 
  EXPERIENCES, 
  PROJECTS, 
  EDUCATION, 
  NAV_ITEMS,
  Z_INDEX,
  SCROLL_OFFSET,
  SCROLLspy_OFFSET
} from './constants';
import { Project } from './types';
import SkillsChart from './components/SkillsChart';

// ==========================================
// App - IMPROVED VERSION
// Features:
// - Extracted constants (no magic numbers)
// - Better accessibility (ARIA labels)
// - Proper React keys using IDs
// - Consolidated state
// - Performance optimizations
// ==========================================

// HighlightText component - extracts and highlights numbers/metrics
const HighlightText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  if (!text) return null;
  
  // Regex matches numbers, percentages, and suffixes
  const regex = /(\d+(?:[.,]\d+)*(?:\+|%|[kKmM])?)/g;
  const parts = text.split(regex);
  
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.match(regex)) {
          return <span key={i} className="text-[#64ffda] font-medium">{part}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

const App: React.FC = () => {
  const [activeExperienceTab, setActiveExperienceTab] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Memoize derived values
  const waNumber = CV_DATA.phone.replace(/[^0-9]/g, '');
  
  const mailtoLink = useMemo(() => {
    const subject = encodeURIComponent("Inquiry from your Portfolio");
    const body = encodeURIComponent(
      `Hi ${CV_DATA.name.split(' ')[0]},\n\nI came across your portfolio and would like to discuss a potential opportunity.\n\nBest regards,`
    );
    return `mailto:${CV_DATA.email}?subject=${subject}&body=${body}`;
  }, []);

  // Scroll to section handler - optimized with useCallback
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Use requestAnimationFrame for smoother performance
    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - SCROLL_OFFSET;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          setActiveSection(id);
        }
      }, 250);
    });
  }, []);

  // Scroll spy - detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + SCROLLspy_OFFSET;

      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      }
      
      // Check home section separately
      const homeElement = document.getElementById(NAV_ITEMS[0].id);
      if (scrollPosition < (homeElement?.offsetTop ?? 0)) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject, isMenuOpen]);

  // Nav link class generator
  const navLinkClass = (id: string) => `
    transition-colors duration-300 mono text-[13px] flex items-center gap-1 cursor-pointer
    ${activeSection === id ? 'text-[#64ffda]' : 'text-[#ccd6f6] hover:text-[#64ffda]'}
  `;

  // Render skill cards grouped by category
  const renderSkillCard = (category: 'Data' | 'QA' | 'Tools' | 'Soft Skill') => {
    const categorySkills = SKILLS.filter(s => s.category === category);
    
    return (
      <div className="bg-[#112240] p-6 rounded-lg border border-[#233554] flex flex-col hover:border-[#64ffda]/30 transition-colors duration-300">
        <h3 className="text-[#64ffda] font-semibold mb-4 mono text-lg">{category}</h3>
        <div className="flex flex-wrap gap-2">
          {categorySkills.map(skill => (
            <span 
              key={skill.id}
              className="bg-[#233554] text-[#ccd6f6] text-xs font-medium px-3 py-1.5 rounded-full mono hover:text-[#64ffda] transition-colors cursor-default border border-transparent hover:border-[#64ffda]/30"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative min-h-screen ${isMenuOpen || selectedProject ? 'overflow-hidden' : ''}`}>
      
      {/* Sidebars (Desktop only) */}
      <div 
        className="fixed bottom-0 left-10 w-10 hidden xl:flex flex-col items-center gap-6 z-50"
        aria-label="Social links"
      >
        <div className="flex flex-col gap-6 mb-4 text-[#a8b2d1]">
          <a 
            href={`https://${CV_DATA.github}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#64ffda] hover:-translate-y-1 transition-all"
            aria-label="GitHub profile"
          >
            <i className="fab fa-github text-xl" aria-hidden="true"></i>
          </a>
          <a 
            href={`https://${CV_DATA.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#64ffda] hover:-translate-y-1 transition-all"
            aria-label="LinkedIn profile"
          >
            <i className="fab fa-linkedin text-xl" aria-hidden="true"></i>
          </a>
          <a 
            href={`https://wa.me/${waNumber}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#64ffda] hover:-translate-y-1 transition-all"
            aria-label="WhatsApp contact"
          >
            <i className="fab fa-whatsapp text-xl" aria-hidden="true"></i>
          </a>
        </div>
        <div className="sidebar-line"></div>
      </div>

      <div 
        className="fixed bottom-0 right-10 w-10 hidden xl:flex flex-col items-center gap-6 z-50"
        aria-label="Contact information"
      >
        <div className="flex flex-col items-center gap-8 mb-4">
          <a 
            href={mailtoLink} 
            className="mono text-xs tracking-widest text-[#a8b2d1] hover:text-[#64ffda] hover:-translate-y-2 transition-all [writing-mode:vertical-rl]"
            aria-label="Send email"
          >
            {CV_DATA.email}
          </a>
          <span 
            className="mono text-xs text-[#a8b2d1] opacity-50 [writing-mode:vertical-rl]"
            aria-label="Discord username"
          >
            {CV_DATA.discord}
          </span>
        </div>
        <div className="sidebar-line"></div>
      </div>

      {/* Navigation */}
      <nav 
        className="fixed top-0 w-full z-[60] px-6 md:px-10 h-20 flex items-center justify-between backdrop-blur-md bg-[#0a192f]/85"
        style={{ zIndex: Z_INDEX.NAVBAR }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[#64ffda] text-2xl font-bold mono group cursor-pointer z-[70]"
          role="button"
          aria-label="Scroll to top"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          LH.
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          <ul className="flex gap-8 items-center">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  onClick={(e) => scrollToSection(e, item.id)} 
                  className={navLinkClass(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <span className="text-[#64ffda] text-[11px]">{item.number}</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.print(); }} 
            className="px-5 py-2.5 border border-[#64ffda] text-[#64ffda] mono text-[13px] rounded hover:bg-[#64ffda]/10 transition-colors ml-4"
            aria-label="Print resume"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-[#64ffda] p-2 relative z-[70] transition-transform duration-300 focus:outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <div className="flex flex-col gap-1.5 w-8 items-end">
            <span className={`block h-0.5 bg-[#64ffda] transition-all duration-300 ${isMenuOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8'}`}></span>
            <span className={`block h-0.5 bg-[#64ffda] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-6'}`}></span>
            <span className={`block h-0.5 bg-[#64ffda] transition-all duration-300 ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-4'}`}></span>
          </div>
        </button>

        {/* Mobile Menu */}
        <aside 
          id="mobile-menu"
          className={`fixed top-0 right-0 h-screen w-[min(75vw,350px)] bg-[#112240] shadow-2xl z-[65] flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ zIndex: Z_INDEX.MOBILE_MENU }}
          aria-hidden={!isMenuOpen}
        >
          <nav className="w-full" aria-label="Mobile navigation">
            <ol className="flex flex-col items-center gap-8 w-full">
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className="w-full text-center">
                  <a 
                    href={`#${item.id}`} 
                    onClick={(e) => scrollToSection(e, item.id)} 
                    className="flex flex-col items-center gap-1 group"
                  >
                    <span className="mono text-[#64ffda] text-sm">{item.number}</span>
                    <span className="text-[#ccd6f6] text-xl group-hover:text-[#64ffda] transition-colors capitalize">{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-12 flex justify-center">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); window.print(); }} 
                className="px-12 py-4 border border-[#64ffda] text-[#64ffda] mono text-base rounded hover:bg-[#64ffda]/10 transition-colors"
                aria-label="Print resume"
              >
                Resume
              </a>
            </div>
          </nav>
        </aside>

        {/* Mobile Menu Overlay */}
        <div 
          onClick={() => setIsMenuOpen(false)}
          className={`fixed inset-0 bg-[#020c1b]/80 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-hidden="true"
        />
      </nav>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-6 md:px-24">
        
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center pt-20 gap-12 md:gap-24">
          <div className="flex-1">
            <p className="mono text-[#64ffda] mb-5 tracking-wide reveal text-sm md:text-base">Hi, my name is</p>
            <h1 className="text-4xl md:text-7xl font-bold text-[#ccd6f6] mb-4 reveal [animation-delay:0.1s] leading-tight">
              {CV_DATA.name}.
            </h1>
            <h2 className="text-2xl md:text-5xl font-bold text-[#8892b0] mb-8 reveal [animation-delay:0.2s] leading-tight">
              Bridging systematic rigor with data-driven clarity.
            </h2>
            <p className="text-[#8892b0] max-w-xl leading-relaxed text-base md:text-lg mb-12 reveal [animation-delay:0.3s]">
              <HighlightText text={CV_DATA.bio} />
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                onClick={(e) => scrollToSection(e, 'projects')} 
                className="px-8 py-4 border border-[#64ffda] text-[#64ffda] mono text-sm rounded hover:bg-[#64ffda]/10 transition-colors reveal [animation-delay:0.4s]"
              >
                Check Out My Projects
              </a>
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')} 
                className="px-8 py-4 text-[#8892b0] mono text-sm rounded hover:text-[#64ffda] transition-colors reveal [animation-delay:0.45s]"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-shrink-0 reveal [animation-delay:0.5s] relative">
            <div className="relative group w-[280px] h-[340px] md:w-[360px] md:h-[440px]">
              <div className="absolute -top-6 -right-6 w-28 h-28 border-t-2 border-r-2 border-[#64ffda]/20 z-0 group-hover:-top-2 group-hover:-right-2 transition-all duration-700"></div>
              <div className="absolute -bottom-6 -left-6 w-28 h-28 border-b-2 border-l-2 border-[#64ffda]/20 z-0 group-hover:-bottom-2 group-hover:-left-2 transition-all duration-700"></div>
              <div className="absolute top-4 left-4 w-full h-full border-2 border-[#64ffda] rounded-lg group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
              
              <div className="relative w-full h-full bg-[#112240] rounded-lg overflow-hidden shadow-2xl border border-[#233554] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-300 z-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-[#64ffda]/10 to-transparent h-1/2 w-full opacity-0 group-hover:opacity-100 animate-[bounce_3s_infinite] pointer-events-none z-30"></div>
                <div className="absolute inset-0 bg-[#64ffda]/10 mix-blend-color group-hover:bg-transparent transition-all duration-500 z-20 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[#0a192f]/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-20"></div>
                
                <img 
                  src={CV_DATA.profileImage} 
                  alt={CV_DATA.name}
                  className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.profile-fallback');
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                
                <div className="profile-fallback hidden flex flex-col items-center justify-center w-full h-full gap-4 text-[#64ffda]/30 text-center p-6 bg-[#112240]">
                  <i className="fas fa-database text-8xl mb-4"></i>
                  <span className="mono text-[10px] uppercase tracking-[0.2em] max-w-[150px]">Profile Image Not Found</span>
                </div>

                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#64ffda] z-40 m-2 opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#64ffda] z-40 m-2 opacity-50"></div>
              </div>

            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 scroll-mt-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-[#ccd6f6] text-2xl md:text-3xl font-bold whitespace-nowrap">
              <span className="mono text-[#64ffda] text-lg md:text-xl mr-2">01.</span> About
            </h2>
            <div className="h-[1px] bg-[#233554] w-full max-w-[300px]" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-4 text-[#8892b0] text-sm md:text-[17px] leading-loose">
              <HighlightText text={CV_DATA.bio} />
            </div>
            <div className="lg:col-span-2 w-full">
              <SkillsChart />
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="py-24 scroll-mt-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-[#ccd6f6] text-2xl md:text-3xl font-bold whitespace-nowrap">
              <span className="mono text-[#64ffda] text-lg md:text-xl mr-2">02.</span> Skills
            </h2>
            <div className="h-[1px] bg-[#233554] w-full" />
          </div>
          <div className="border border-[#64ffda]/30 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderSkillCard('Data')}
              {renderSkillCard('QA')}
              {renderSkillCard('Tools')}
              {renderSkillCard('Soft Skill')}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 scroll-mt-20 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-[#ccd6f6] text-2xl md:text-3xl font-bold whitespace-nowrap">
              <span className="mono text-[#64ffda] text-lg md:text-xl mr-2">03.</span> Experience
            </h2>
            <div className="h-[1px] bg-[#233554] w-full" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 min-h-[300px]">
            {/* Company Tabs */}
            <div 
              className="flex md:flex-col overflow-x-auto md:overflow-x-visible border-b-2 md:border-b-0 md:border-l-2 border-[#233554] scrollbar-hide shrink-0"
              role="tablist"
              aria-label="Work experience companies"
            >
              {EXPERIENCES.map((exp, idx) => (
                <button 
                  key={exp.id}
                  onClick={() => setActiveExperienceTab(idx)} 
                  className={`px-5 py-3 text-left mono text-[12px] md:text-[13px] whitespace-nowrap transition-all border-b-2 md:border-b-0 md:border-l-2 -mb-[2px] md:-mb-0 md:-ml-[2px] ${activeExperienceTab === idx ? 'border-[#64ffda] text-[#64ffda] bg-[#112240]' : 'border-transparent text-[#8892b0] hover:text-[#64ffda] hover:bg-[#112240]'}`}
                  role="tab"
                  aria-selected={activeExperienceTab === idx}
                  aria-controls={`experience-panel-${exp.id}`}
                  id={`experience-tab-${exp.id}`}
                >
                  {exp.company}
                </button>
              ))}
            </div>
            
            {/* Experience Content */}
            <div 
              className="flex-1 mt-4 md:mt-0"
              role="tabpanel"
              id={`experience-panel-${EXPERIENCES[activeExperienceTab].id}`}
              aria-labelledby={`experience-tab-${EXPERIENCES[activeExperienceTab].id}`}
            >
              <h3 className="text-lg md:text-xl font-bold text-[#ccd6f6]">
                {EXPERIENCES[activeExperienceTab].role} 
                <span className="text-[#64ffda]">@ {EXPERIENCES[activeExperienceTab].company}</span>
              </h3>
              <p className="mono text-[12px] text-[#8892b0] mt-1 mb-2">{EXPERIENCES[activeExperienceTab].period}</p>
              
              <ul className="space-y-5 mt-6">
                {EXPERIENCES[activeExperienceTab].description.map((desc, i) => (
                  <li key={i} className="flex gap-3 text-[#8892b0] text-sm md:text-[15px] leading-relaxed">
                    <span className="text-[#64ffda] text-xs mt-1 shrink-0">▹</span>
                    <span><HighlightText text={desc} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 scroll-mt-20">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-[#ccd6f6] text-2xl md:text-3xl font-bold whitespace-nowrap">
              <span className="mono text-[#64ffda] text-lg md:text-xl mr-2">04.</span> Projects
            </h2>
            <div className="h-[1px] bg-[#233554] w-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROJECTS.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group bg-[#112240] rounded-lg p-8 border border-[#233554] hover:border-[#64ffda]/50 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
                aria-label={`View ${project.title} project details`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <i className="fas fa-folder text-[#64ffda] text-4xl" aria-hidden="true"></i>
                    <div className="flex gap-4 text-[#ccd6f6] text-xl">
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-[#64ffda]"
                          aria-label={`View ${project.title} external link`}
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-xl font-bold text-[#ccd6f6] group-hover:text-[#64ffda]">{project.title}</h3>
                  </div>
                  
                  <p className="mono text-[10px] text-[#64ffda] mb-3 uppercase tracking-wider">{project.period}</p>
                  <p className="text-[#8892b0] text-sm leading-relaxed mb-6">
                    <HighlightText text={project.description} />
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto pt-4 border-t border-[#233554]/50">
                  {project.tags.map((tag) => (
                    <span key={tag} className="mono text-[10px] text-[#8892b0]">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 scroll-mt-20 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-[#ccd6f6] text-2xl md:text-3xl font-bold whitespace-nowrap">
              <span className="mono text-[#64ffda] text-lg md:text-xl mr-2">05.</span> Education
            </h2>
            <div className="h-[1px] bg-[#233554] w-full" />
          </div>
          
          <div className="space-y-12">
            {EDUCATION.map((edu) => (
              <div key={edu.id} className="relative pl-8 border-l-2 border-[#233554]">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#0a192f] border-2 border-[#64ffda]"></div>
                <h3 className="text-xl font-bold text-[#ccd6f6]">{edu.institution}</h3>
                <p className="text-[#64ffda] mono text-sm mt-1">{edu.degree}</p>
                <p className="mono text-xs text-[#8892b0] mt-1">{edu.period} | {edu.location}</p>
                
                <ul className="mt-4 space-y-3">
                  {edu.highlights?.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#8892b0] text-sm leading-relaxed">
                      <span className="text-[#64ffda] text-[10px]">▹</span>
                      <span><HighlightText text={highlight} /></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 text-center max-w-2xl mx-auto">
          <p className="mono text-[#64ffda] mb-4 text-sm tracking-widest uppercase">06. Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#ccd6f6] mb-6">Let's Connect</h2>
          <p className="text-[#8892b0] mb-12">
            I'm currently looking for new opportunities in Data-Driven QA. My inbox is always open!
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a 
              href={mailtoLink} 
              className="px-12 py-5 border border-[#64ffda] text-[#64ffda] mono text-sm rounded hover:bg-[#64ffda]/10 transition-colors flex items-center justify-center gap-3"
            >
              <i className="fas fa-envelope"></i> Email Me
            </a>
            <a 
              href={`https://wa.me/${waNumber}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-12 py-5 bg-[#112240] border border-[#233554] text-[#ccd6f6] mono text-sm rounded hover:border-[#64ffda] hover:text-[#64ffda] transition-all flex items-center justify-center gap-3"
            >
              <i className="fab fa-whatsapp text-[#64ffda]"></i> WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          style={{ zIndex: Z_INDEX.PROJECT_MODAL }}
        >
          {/* Backdrop */}
          <div 
            onClick={() => setSelectedProject(null)} 
            className="absolute inset-0 bg-[#020c1b]/90 backdrop-blur-md"
            style={{ zIndex: Z_INDEX.MODAL_OVERLAY }}
          />
          
          {/* Modal Content */}
          <div className="relative bg-[#112240] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl border border-[#233554] p-8 md:p-12 reveal scrollbar-hide" style={{ zIndex: Z_INDEX.PROJECT_CONTENT }}>
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-6 right-6 text-[#8892b0] hover:text-[#64ffda] p-2 z-10"
              aria-label="Close project details"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <p className="mono text-[#64ffda] text-xs tracking-widest uppercase bg-[#64ffda]/10 px-3 py-1 rounded">Project Case Study</p>
                {selectedProject.link && (
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mono text-[#64ffda] text-xs hover:underline flex items-center gap-2"
                  >
                     • View Project <i className="fas fa-external-link-alt text-[10px]"></i>
                  </a>
                )}
              </div>
              <h2 id="project-modal-title" className="text-3xl md:text-5xl font-bold text-[#ccd6f6] mb-2">{selectedProject.title}</h2>
              <p className="mono text-[#8892b0] text-sm md:text-base">{selectedProject.period}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                {selectedProject.summary && (
                  <div>
                    <h4 className="text-[#ccd6f6] font-bold text-lg mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#64ffda] block"></span> Project Summary
                    </h4>
                    <p className="text-[#8892b0] leading-loose text-[15px]">
                      <HighlightText text={selectedProject.summary} />
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {selectedProject.goals && (
                    <div>
                      <h4 className="text-[#ccd6f6] font-bold text-sm mono uppercase tracking-wider mb-3 text-[#64ffda]">Goals</h4>
                      <p className="text-[#8892b0] leading-relaxed text-sm">
                        <HighlightText text={selectedProject.goals} />
                      </p>
                    </div>
                  )}
                  {selectedProject.process && (
                    <div>
                      <h4 className="text-[#ccd6f6] font-bold text-sm mono uppercase tracking-wider mb-3 text-[#64ffda]">Process</h4>
                      <p className="text-[#8892b0] leading-relaxed text-sm">
                        <HighlightText text={selectedProject.process} />
                      </p>
                    </div>
                  )}
                </div>

                {selectedProject.output && (
                  <div className="bg-[#0a192f] p-6 rounded-lg border border-[#233554]">
                    <h4 className="text-[#ccd6f6] font-bold text-sm mono uppercase tracking-wider mb-4 text-[#64ffda]">Output</h4>
                    <p className="text-[#8892b0] leading-relaxed text-sm">
                      <HighlightText text={selectedProject.output} />
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                 {selectedProject.achievements && (
                   <div className="bg-[#1b2b48] p-6 rounded-lg border-l-4 border-[#64ffda]">
                     <h4 className="text-[#ccd6f6] font-bold mb-4 text-sm mono uppercase tracking-wider">Scope of Work / Achievements</h4>
                     <ul className="space-y-4">
                        {selectedProject.achievements.map((item, i) => (
                          <li key={i} className="flex gap-3 text-[#8892b0] text-xs leading-relaxed">
                            <span className="text-[#64ffda] shrink-0 mt-0.5">▹</span>
                            <span><HighlightText text={item} /></span>
                          </li>
                        ))}
                     </ul>
                   </div>
                 )}

                 <div className="bg-[#0a192f] p-6 rounded-lg border border-[#233554]">
                    <div className="mb-6">
                      <div className="text-[#64ffda] text-3xl font-bold mono">
                        {selectedProject.metricValue.toLocaleString()}{selectedProject.metricLabel.includes('Rating') ? '%' : ''}
                      </div>
                      <div className="mono text-[10px] text-[#8892b0] uppercase tracking-widest">{selectedProject.metricLabel}</div>
                    </div>
                    <div>
                      <h4 className="text-[#ccd6f6] font-bold text-xs mono uppercase tracking-wider mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-[#233554] rounded mono text-[9px] text-[#64ffda]">{tag}</span>
                        ))}
                      </div>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-[#233554] flex justify-between items-center">
               <button 
                 onClick={() => setSelectedProject(null)} 
                 className="text-[#8892b0] hover:text-[#64ffda] mono text-xs flex items-center gap-2 transition-colors"
               >
                  <i className="fas fa-arrow-left"></i> Back to Projects
               </button>
               {selectedProject.note && (
                 <p className="text-[11px] italic text-[#8892b0] max-w-[200px] text-right">{selectedProject.note}</p>
               )}
            </div>
          </div>
        </div>
      )}

      <footer className="py-12 text-center opacity-50 mono text-[10px]">
        Designed & Built by {CV_DATA.name} &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
