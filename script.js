// Global variables
const currentStoryIndex = 0
let currentStep = 1
let userLocation = null

    window.addEventListener('load', function() {
        setTimeout(function() {
            document.body.classList.add('loaded');
            setTimeout(function() {
                var loading = document.getElementById('loadingScreen');
                if (loading) loading.style.display = 'none';
            }, 600);
        }, 600);
    });
document.addEventListener('DOMContentLoaded', function() {
                    const selectorBtn = document.getElementById('countrySelectorBtn');
                    const dropdown = document.getElementById('countryDropdown');
                    const flagSpan = document.getElementById('selectedCountryFlag');
                    const nameSpan = document.getElementById('selectedCountryName');
                    let isOpen = false;

                    selectorBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        isOpen = !isOpen;
                        dropdown.style.display = isOpen ? 'block' : 'none';
                        selectorBtn.setAttribute('aria-expanded', isOpen);
                    });

                    document.addEventListener('click', function() {
                        if (isOpen) {
                            dropdown.style.display = 'none';
                            selectorBtn.setAttribute('aria-expanded', false);
                            isOpen = false;
                        }
                    });

                    dropdown.querySelectorAll('.country-option').forEach(function(option) {
                        option.addEventListener('click', function(e) {
                            e.stopPropagation();
                            // Set selected flag and name
                            const img = option.querySelector('img');
                            flagSpan.innerHTML = img ? img.outerHTML : option.textContent.trim().charAt(0);
                            nameSpan.textContent = option.textContent.trim().replace(/^[^\w]+/, '');
                            dropdown.style.display = 'none';
                            selectorBtn.setAttribute('aria-expanded', false);
                            isOpen = false;
                            // Optionally: trigger country-specific logic here
                        });
                    });
                });

                // Mobile Country Selector logic
                document.addEventListener('DOMContentLoaded', function() {
                    const mobileBtn = document.getElementById('mobileCountrySelectorBtn');
                    const mobileDropdown = document.getElementById('mobileCountryDropdown');
                    const mobileFlag = document.getElementById('mobileSelectedCountryFlag');
                    const mobileName = document.getElementById('mobileSelectedCountryName');
                    const options = mobileDropdown.querySelectorAll('.mobile-country-option');

                    // Toggle dropdown
                    mobileBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
                        mobileBtn.setAttribute('aria-expanded', !expanded);
                        mobileDropdown.style.display = expanded ? 'none' : 'block';
                    });

                    // Select country
                    options.forEach(option => {
                        option.addEventListener('click', function() {
                            // Update button
                            const img = option.querySelector('img').cloneNode(true);
                            mobileFlag.innerHTML = '';
                            mobileFlag.appendChild(img);
                            mobileName.textContent = option.textContent.trim();
                            // Hide dropdown
                            mobileDropdown.style.display = 'none';
                            mobileBtn.setAttribute('aria-expanded', 'false');
                            // Optionally, sync with desktop selector or trigger country change logic here
                        });
                    });

                    // Close dropdown on outside click
                    document.addEventListener('click', function(e) {
                        if (!mobileBtn.contains(e.target) && !mobileDropdown.contains(e.target)) {
                            mobileDropdown.style.display = 'none';
                            mobileBtn.setAttribute('aria-expanded', 'false');
                        }
                    });
                });
// Enhanced country-specific content data
const countryContent = {
  IN: {
    country: "India",
    title: "Launch Your Global Healthcare Career from India",
    subtitle:
      "Join thousands of Indian healthcare professionals working worldwide with Apollo GWD's comprehensive support and training programs.",
    opportunities: [
      {
        icon: "fas fa-flag",
        title: "UK Nursing Pathway",
        description: "Complete OSCE preparation and NHS placement support for Indian nurses seeking UK opportunities.",
        features: ["OSCE Training", "CBT Preparation", "NMC Registration", "NHS Placement", "Visa Support"],
      },
      {
        icon: "fas fa-user-md",
        title: "PLAB & NHS Fellowship",
        description: "Medical career advancement through UK licensing and fellowship programs for Indian doctors.",
        features: ["PLAB 1 & 2 Prep", "NHS Fellowship", "GMC Registration", "Hospital Placement", "Clinical Training"],
      },
      {
        icon: "fas fa-globe-americas",
        title: "USA Healthcare Migration",
        description: "NCLEX preparation and US healthcare system integration for Indian healthcare professionals.",
        features: ["NCLEX Training", "IELTS Support", "CGFNS Evaluation", "Visa Processing", "Employer Connect"],
      },
      {
        icon: "fas fa-maple-leaf",
        title: "Canada Healthcare Opportunities",
        description: "Comprehensive support for Canadian healthcare licensing and placement.",
        features: ["NCLEX-RN Canada", "Language Training", "Provincial Registration", "Job Placement"],
      },
    ],
    stats: {
      professionals: "3,500+",
      successRate: "96%",
      destinations: "8",
      programs: "25+",
    },
  },
  PH: {
    country: "Philippines",
    title: "Advance Your Healthcare Career from the Philippines",
    subtitle:
      "Specialized pathways for Filipino healthcare professionals to work globally with comprehensive training and placement support.",
    opportunities: [
      {
        icon: "fas fa-flag",
        title: "Australia Healthcare Jobs",
        description: "AHPRA registration and placement support for Filipino healthcare professionals.",
        features: ["AHPRA Registration", "English Test Prep", "Skills Assessment", "Job Placement", "Visa Support"],
      },
      {
        icon: "fas fa-stethoscope",
        title: "Radiographer Opportunities",
        description: "Specialized training for radiographers seeking international careers in developed countries.",
        features: [
          "Technical Training",
          "Certification Prep",
          "Equipment Training",
          "Global Placement",
          "UK CDC Support",
        ],
      },
      {
        icon: "fas fa-user-nurse",
        title: "International Nursing",
        description: "Comprehensive nursing career development for global opportunities and placements.",
        features: ["Clinical Skills", "Language Training", "Cultural Prep", "Career Support", "Ongoing Mentorship"],
      },
      {
        icon: "fas fa-flag-usa",
        title: "USA Nursing Pathway",
        description: "NCLEX preparation and US healthcare system integration for Filipino nurses.",
        features: ["NCLEX-RN Prep", "IELTS Training", "Visa Screen", "Employer Matching", "Relocation Support"],
      },
    ],
    stats: {
      professionals: "2,800+",
      successRate: "94%",
      destinations: "6",
      programs: "20+",
    },
  },
  default: {
    country: "Your Location",
    title: "Advance Your Healthcare Career Globally",
    subtitle:
      "Connect with international opportunities, get certified, and build your global healthcare career with Apollo GWD's comprehensive support.",
    opportunities: [
      {
        icon: "fas fa-user-nurse",
        title: "Global Nursing Opportunities",
        description: "Comprehensive nursing career pathways to work worldwide with full support.",
        features: [
          "International Licensing",
          "Clinical Training",
          "Language Support",
          "Job Placement",
          "Career Mentoring",
        ],
      },
      {
        icon: "fas fa-user-md",
        title: "Medical Career Advancement",
        description: "Fellowship programs and licensing support for doctors seeking global opportunities.",
        features: [
          "Licensing Exams",
          "Fellowship Programs",
          "Hospital Placements",
          "Career Growth",
          "Research Opportunities",
        ],
      },
      {
        icon: "fas fa-stethoscope",
        title: "Allied Health Pathways",
        description: "Specialized support for allied health professionals in global markets.",
        features: [
          "Certification Support",
          "Skills Training",
          "Global Opportunities",
          "Career Development",
          "Professional Networks",
        ],
      },
      {
        icon: "fas fa-globe",
        title: "Worldwide Placement",
        description: "Access to healthcare opportunities across 13 countries worldwide.",
        features: [
          "13 Countries",
          "Multiple Specialties",
          "End-to-End Support",
          "Cultural Training",
          "Ongoing Assistance",
        ],
      },
    ],
    stats: {
      professionals: "10,000+",
      successRate: "95%",
      destinations: "13",
      programs: "50+",
    },
  },
}

// Enhanced pathway recommendations data
const pathwayRecommendations = {
  "nurse-uk-fresh": {
    title: "UK Nursing Pathway for Fresh Graduates",
    description: "Perfect entry route for new nursing graduates to start their UK career.",
    steps: [
      "Complete OSCE preparation program",
      "Pass CBT (Computer Based Test)",
      "English language certification (IELTS/OET)",
      "NMC registration process",
      "Visa application support",
      "NHS trust placement",
    ],
    duration: "6-12 months",
    nextSteps: "Start with our Nurse EDGE foundation program",
  },
  "nurse-usa-1-3": {
    title: "USA Nursing Migration for Experienced Nurses",
    description: "Accelerated pathway for experienced nurses to work in the United States.",
    steps: [
      "NCLEX-RN preparation and examination",
      "IELTS/TOEFL English proficiency",
      "Credentials evaluation (CGFNS)",
      "State nursing license application",
      "Visa screen certificate",
      "Employer sponsorship and placement",
    ],
    duration: "8-15 months",
    nextSteps: "Begin with NCLEX preparation course",
  },
  "doctor-uk-3-5": {
    title: "UK Medical Career for Experienced Doctors",
    description: "Comprehensive pathway for doctors to practice medicine in the UK.",
    steps: [
      "PLAB Part 1 examination",
      "PLAB Part 2 clinical assessment",
      "GMC registration and licensing",
      "NHS foundation or specialty training",
      "Visa and immigration support",
      "Hospital placement and career development",
    ],
    duration: "12-24 months",
    nextSteps: "Enroll in PLAB preparation program",
  },
  "allied-uk-5+": {
    title: "UK Allied Health Professional Pathway",
    description: "Specialized route for allied health professionals to work in the UK.",
    steps: [
      "HCPC registration process",
      "Professional competency assessment",
      "English language certification",
      "Skills gap analysis and training",
      "Employer engagement and interviews",
      "Visa support and relocation assistance",
    ],
    duration: "6-18 months",
    nextSteps: "Complete skills assessment evaluation",
  },
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeWebsite()
  setupEventListeners()
  simulateLocationDetection()
  setupIntersectionObserver()
})

// Initialize website
function initializeWebsite() {
  setupMobileNavigation()
  setupPathwaysForm()
  setupSuccessStories()
  setupModal()
  setupScrollEffects()
  setupMegaMenus()
}

// Enhanced mobile navigation setup
function setupMobileNavigation() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileNav = document.getElementById("mobileNav")
  const mobileCloseBtn = document.getElementById("mobileCloseBtn")
  const mobileMenuToggles = document.querySelectorAll(".mobile-menu-toggle")

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active")
      mobileMenuBtn.classList.toggle("active")
      document.body.style.overflow = mobileNav.classList.contains("active") ? "hidden" : ""
    })
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener("click", closeMobileMenu)
  }

  if (mobileNav) {
    mobileNav.addEventListener("click", (e) => {
      if (e.target === mobileNav) {
        closeMobileMenu()
      }
    })
  }

  // Enhanced mobile submenu toggles
  mobileMenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault()
      const submenu = toggle.nextElementSibling
      const icon = toggle.querySelector("i")

      // Close other open submenus
      mobileMenuToggles.forEach((otherToggle) => {
        if (otherToggle !== toggle) {
          const otherSubmenu = otherToggle.nextElementSibling
          const otherIcon = otherToggle.querySelector("i")
          if (otherSubmenu) otherSubmenu.classList.remove("active")
          if (otherIcon) {
            otherIcon.classList.remove("fa-chevron-up")
            otherIcon.classList.add("fa-chevron-down")
          }
        }
      })

      // Toggle current submenu
      if (submenu) submenu.classList.toggle("active")
      if (icon) {
        icon.classList.toggle("fa-chevron-down")
        icon.classList.toggle("fa-chevron-up")
      }
    })
  })

  // Close menu when clicking on links
  const mobileLinks = document.querySelectorAll(".mobile-nav a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Handle escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav?.classList.contains("active")) {
      closeMobileMenu()
    }
  })
}

function closeMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")

  if (mobileNav) mobileNav.classList.remove("active")
  if (mobileMenuBtn) mobileMenuBtn.classList.remove("active")
  document.body.style.overflow = ""

  // Close all submenus
  const activeSubmenus = document.querySelectorAll(".mobile-submenu.active")
  activeSubmenus.forEach((submenu) => {
    submenu.classList.remove("active")
    const toggle = submenu.previousElementSibling
    if (toggle) {
      const icon = toggle.querySelector("i")
      if (icon) {
        icon.classList.remove("fa-chevron-up")
        icon.classList.add("fa-chevron-down")
      }
    }
  })
}

// Enhanced mega menu setup
function setupMegaMenus() {
  const menuItems = document.querySelectorAll(".menu-item")

  menuItems.forEach((item) => {
    const megaMenu = item.querySelector(".mega-menu, .dropdown-menu")

    if (megaMenu) {
      let hideTimeout

      item.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout)
        megaMenu.style.opacity = "1"
        megaMenu.style.visibility = "visible"
        megaMenu.style.transform = item.querySelector(".mega-menu") ? "translateX(-50%) translateY(0)" : "translateY(0)"
      })

      item.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
          megaMenu.style.opacity = "0"
          megaMenu.style.visibility = "hidden"
          megaMenu.style.transform = item.querySelector(".mega-menu")
            ? "translateX(-50%) translateY(-10px)"
            : "translateY(-10px)"
        }, 150)
      })
    }
  })
}

// Setup event listeners
function setupEventListeners() {
  // Hero CTA buttons
  const exploreBtn = document.getElementById("exploreOpportunities")
  const pathwayBtn = document.getElementById("findPathway")

  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      document.getElementById("opportunities").scrollIntoView({ behavior: "smooth" })
    })
  }

  if (pathwayBtn) {
    pathwayBtn.addEventListener("click", () => {
      document.getElementById("pathways").scrollIntoView({ behavior: "smooth" })
    })
  }

  // CTA section buttons
  const startJourneyBtn = document.getElementById("startJourney")
  const speakExpertBtn = document.getElementById("speakExpert")

  if (startJourneyBtn) {
    startJourneyBtn.addEventListener("click", showModal)
  }

  if (speakExpertBtn) {
    speakExpertBtn.addEventListener("click", showModal)
  }

  // Contact form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmission)
  }

  // Smooth scrolling for all anchor links
  document.addEventListener("click", handleSmoothScrolling)
}

// Simulate Location Detection (enhanced)
function simulateLocationDetection() {
  // Simulate detecting different countries for demonstration
  const countries = ["IN", "PH", "default"]
  const randomCountry = countries[Math.floor(Math.random() * countries.length)]

  setTimeout(() => {
    userLocation = randomCountry
    updateContentBasedOnLocation(userLocation)
  }, 1000)
}

// Enhanced content update based on location
function updateContentBasedOnLocation(countryCode) {
  const content = countryContent[countryCode] || countryContent["default"]

  // Update country indicator
  const countryIndicator = document.getElementById("detectedCountry")
  if (countryIndicator) {
    countryIndicator.textContent = `Opportunities for ${content.country}`
  }

  // Update hero content
  const heroTitle = document.getElementById("heroTitle")
  const heroSubtitle = document.getElementById("heroSubtitle")

  if (heroTitle) heroTitle.textContent = content.title
  if (heroSubtitle) heroSubtitle.textContent = content.subtitle

  // Update hero stats if available
  if (content.stats) {
    const statItems = document.querySelectorAll(".stat-item")
    if (statItems.length >= 3) {
      statItems[0].querySelector(".stat-number").textContent = content.stats.professionals
      statItems[0].querySelector(".stat-label").textContent = "Professionals Placed"

      statItems[1].querySelector(".stat-number").textContent = content.stats.destinations
      statItems[1].querySelector(".stat-label").textContent = "Countries Served"

      statItems[2].querySelector(".stat-number").textContent = content.stats.successRate
      statItems[2].querySelector(".stat-label").textContent = "Success Rate"
    }
  }

  // Update opportunities section
  updateOpportunitiesSection(content)
}

/**
 * Optimized Opportunities Section Carousel
 * Uses opportunitiesData and countryMeta for dynamic rendering.
 */
const opportunitiesData = {
  india: [
    {
      icon: 'fas fa-flag',
      title: 'UK Nursing Pathway',
      desc: 'Complete OSCE preparation and NHS placement support for Indian nurses.',
      features: ['OSCE Training', 'CBT Preparation', 'Visa Support', 'NHS Placement'],
      link: '#'
    },
    {
      icon: 'fas fa-user-md',
      title: 'PLAB & NHS Fellowship',
      desc: 'Medical career advancement through UK licensing and fellowship programs.',
      features: ['PLAB 1 & 2 Prep', 'NHS Fellowship', 'GMC Registration', 'Hospital Placement'],
      link: '#'
    },
    {
      icon: 'fas fa-globe-americas',
      title: 'USA Healthcare Migration',
      desc: 'NCLEX preparation and US healthcare system integration for nurses.',
      features: ['NCLEX Training', 'IELTS Support', 'Visa Processing', 'Employer Connect'],
      link: '#'
    }
  ],
  uk: [
    {
      icon: 'fas fa-user-nurse',
      title: 'NHS Career Progression',
      desc: 'Advance your nursing career within the NHS with leadership and specialty training.',
      features: ['Leadership Programs', 'Specialty Training', 'Mentorship', 'NHS Placement'],
      link: '#'
    },
    {
      icon: 'fas fa-user-md',
      title: 'Fellowships for Doctors',
      desc: 'Specialized fellowships and research opportunities for doctors in the UK.',
      features: ['Clinical Fellowships', 'Research Opportunities', 'NHS Trusts', 'Visa Support'],
      link: '#'
    }
  ],
  usa: [
    {
      icon: 'fas fa-user-nurse',
      title: 'NCLEX & US Placement',
      desc: 'Comprehensive NCLEX prep and placement for nurses in the USA.',
      features: ['NCLEX Training', 'Visa Assistance', 'Employer Connect', 'Onboarding Support'],
      link: '#'
    },
    {
      icon: 'fas fa-user-md',
      title: 'USMLE Pathway',
      desc: 'USMLE preparation and residency application support for doctors.',
      features: ['USMLE Prep', 'Residency Guidance', 'Visa Support', 'Mentorship'],
      link: '#'
    }
  ],
  australia: [
    {
      icon: 'fas fa-user-nurse',
      title: 'AHPRA Registration',
      desc: 'Guidance for nurses to achieve AHPRA registration and work in Australia.',
      features: ['AHPRA Support', 'English Test Prep', 'Visa Guidance', 'Employer Connect'],
      link: '#'
    },
    {
      icon: 'fas fa-user-md',
      title: 'Medical Migration',
      desc: 'Pathways for doctors to practice in Australia with AMC support.',
      features: ['AMC Exam Prep', 'Registration Guidance', 'Visa Support', 'Placement'],
      link: '#'
    }
  ],
  germany: [
    {
      icon: 'fas fa-user-nurse',
      title: 'German Nursing Pathway',
      desc: 'Language and licensing support for nurses to work in Germany.',
      features: ['German Language Prep', 'Anerkennung Process', 'Visa Support', 'Placement'],
      link: '#'
    },
    {
      icon: 'fas fa-user-md',
      title: 'Doctors in Germany',
      desc: 'Support for doctors to obtain Approbation and work in Germany.',
      features: ['Language Training', 'Approbation Guidance', 'Visa Support', 'Hospital Placement'],
      link: '#'
    }
  ]
};

const countryMeta = {
  india: {
    flag: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg',
    title: 'Opportunities in India',
    subtitle: 'Discover tailored pathways for your location'
  },
  uk: {
    flag: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg',
    title: 'Opportunities in UK',
    subtitle: 'Advance your career with NHS and UK healthcare programs'
  },
  usa: {
    flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    title: 'Opportunities in USA',
    subtitle: 'Explore US healthcare migration and training pathways'
  },
  australia: {
    flag: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg',
    title: 'Opportunities in Australia',
    subtitle: 'Pathways for healthcare professionals in Australia'
  },
  germany: {
    flag: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
    title: 'Opportunities in Germany',
    subtitle: 'Work and train as a healthcare professional in Germany'
  }
};

function renderSingleOpportunity(country, idx = 0) {
  const track = document.getElementById('opportunitiesCarouselTrack');
  const cards = opportunitiesData[country] || [];
  if (!track) return;
  if (!cards.length) {
    track.innerHTML = '';
    return;
  }
  const card = cards[idx];
  track.innerHTML = `
    <div class="opportunity-modern-card fade-in visible">
      <div class="opportunity-modern-icon">
        <i class="${card.icon}"></i>
      </div>
      <h3>${card.title}</h3>
      <p>${card.desc}</p>
      <ul class="opportunity-modern-features">
        ${card.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
      </ul>
      <a href="${card.link}" class="btn btn-outline">Learn More</a>
    </div>
  `;
}

function updateCountryInfo(country) {
  const meta = countryMeta[country];
  if (!meta) return;
  const flagEl = document.getElementById('opportunitiesCountryFlag');
  const titleEl = document.getElementById('opportunitiesCountryTitle');
  const subtitleEl = document.getElementById('opportunitiesCountrySubtitle');
  if (flagEl) flagEl.innerHTML = `<img src="${meta.flag}" alt="${meta.title} Flag" />`;
  if (titleEl) titleEl.textContent = meta.title;
  if (subtitleEl) subtitleEl.textContent = meta.subtitle;
}

document.addEventListener('DOMContentLoaded', function () {
  let currentCountry = 'india';
  let currentIdx = 0;
  const countrySelect = document.getElementById('opportunitiesCountrySelect');
  const prevBtn = document.getElementById('opportunitiesPrev');
  const nextBtn = document.getElementById('opportunitiesNext');

  if (countrySelect) {
    countrySelect.addEventListener('change', function () {
      currentCountry = countrySelect.value;
      currentIdx = 0;
      updateCountryInfo(currentCountry);
      renderSingleOpportunity(currentCountry, currentIdx);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      const cards = opportunitiesData[currentCountry] || [];
      if (!cards.length) return;
      currentIdx = (currentIdx - 1 + cards.length) % cards.length;
      renderSingleOpportunity(currentCountry, currentIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      const cards = opportunitiesData[currentCountry] || [];
      if (!cards.length) return;
      currentIdx = (currentIdx + 1) % cards.length;
      renderSingleOpportunity(currentCountry, currentIdx);
    });
  }

  // Initial render
  updateCountryInfo(currentCountry);
  renderSingleOpportunity(currentCountry, currentIdx);
});

// Pathways Form Setup (unchanged)
function setupPathwaysForm() {
  const nextBtn = document.getElementById("nextStep")
  const prevBtn = document.getElementById("prevStep")
  const getStartedBtn = document.getElementById("getStarted")
  const form = document.getElementById("pathwaysForm")

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (validateCurrentStep()) {
        nextStep()
      }
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevStep)
  }

  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", showModal)
  }

  // Add change listeners to form inputs
  if (form) {
    const formInputs = form.querySelectorAll('input[type="radio"]')
    formInputs.forEach((input) => {
      input.addEventListener("change", () => {
        if (currentStep < 4) {
          setTimeout(() => {
            if (validateCurrentStep()) {
              nextStep()
            }
          }, 500)
        }
      })
    })
  }
}

function validateCurrentStep() {
  const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`)
  if (!currentStepElement) return true

  const requiredInputs = currentStepElement.querySelectorAll('input[type="radio"]')
  if (!requiredInputs.length) return true

  return Array.from(requiredInputs).some((input) => input.checked)
}

function nextStep() {
  if (currentStep < 4) {
    // Hide current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`)
    if (currentStepElement) currentStepElement.classList.remove("active")

    currentStep++


const nextStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`)
if (nextStepElement) nextStepElement.classList.add("active")

// Update progress bar or indicator if present
updateFormProgress()
  } else {
// Final step: show recommendations
showPathwayRecommendation()
  }
}

function prevStep() {
  if (currentStep > 1) {
// Hide current step
const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`)
if (currentStepElement) currentStepElement.classList.remove("active")

currentStep--

// Show previous step
const prevStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`)
if (prevStepElement) prevStepElement.classList.add("active")

updateFormProgress()
  }
}

function updateFormProgress() {
  const progressBar = document.getElementById("formProgress")
  if (progressBar) {
progressBar.style.width = `${(currentStep - 1) * 33}%`
  }
}

// Show pathway recommendation based on form selections and country
function showPathwayRecommendation() {
  const form = document.getElementById("pathwaysForm")
  if (!form) return

  // Collect form values
  const role = form.querySelector('input[name="role"]:checked')?.value
  const destination = form.querySelector('input[name="destination"]:checked')?.value
  const experience = form.querySelector('input[name="experience"]:checked')?.value

  // Determine pathway key (expand logic as needed for more countries)
  let pathwayKey = ""
  if (role === "nurse" && destination === "uk" && experience === "fresh") {
pathwayKey = "nurse-uk-fresh"
  } else if (role === "nurse" && destination === "usa" && (experience === "1-3" || experience === "3-5" || experience === "5+")) {
pathwayKey = "nurse-usa-1-3"
  } else if (role === "doctor" && destination === "uk" && (experience === "3-5" || experience === "5+")) {
pathwayKey = "doctor-uk-3-5"
  } else if (role === "allied" && destination === "uk" && experience === "5+") {
pathwayKey = "allied-uk-5+"
  }

  // Show recommendation if found
  const recommendation = pathwayRecommendations[pathwayKey]
  const recommendationSection = document.getElementById("pathwayRecommendation")
  if (recommendation && recommendationSection) {
recommendationSection.innerHTML = `
  <h3>${recommendation.title}</h3>
  <p>${recommendation.description}</p>
  <ul>
  ${recommendation.steps.map(step => `<li>${step}</li>`).join("")}
  </ul>
  <p><strong>Typical Duration:</strong> ${recommendation.duration}</p>
  <p><strong>Next Steps:</strong> ${recommendation.nextSteps}</p>
  <button class="btn btn-primary" id="getStartedFinal">Get Started</button>
`
recommendationSection.style.display = "block"
document.getElementById("getStartedFinal").addEventListener("click", showModal)
  } else if (recommendationSection) {
recommendationSection.innerHTML = `<p>Sorry, we couldn't find a recommended pathway for your selection. Please contact our team for personalized guidance.</p>`
recommendationSection.style.display = "block"
  }
}

// Success Stories Carousel (unchanged)
function setupSuccessStories() {
  // Placeholder for carousel logic
}

// Modal logic (unchanged)
function setupModal() {
  // Placeholder for modal logic
}

function showModal() {
  const modal = document.getElementById("modal")
  if (modal) {
modal.classList.add("active")
document.body.style.overflow = "hidden"
modal.querySelector(".modal-close").addEventListener("click", () => {
  modal.classList.remove("active")
  document.body.style.overflow = ""
})
  }
}

// Scroll effects (unchanged)
function setupScrollEffects() {
  // Placeholder for scroll effects
}

// Intersection Observer for fade-in effects
function setupIntersectionObserver() {
  const fadeEls = document.querySelectorAll(".fade-in")
  if ("IntersectionObserver" in window) {
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add("visible")
    observer.unobserve(entry.target)
  }
  })
}, { threshold: 0.1 })
fadeEls.forEach((el) => observer.observe(el))
  } else {
// Fallback: show all
fadeEls.forEach((el) => el.classList.add("visible"))
  }
}

// Smooth scrolling for anchor links
function handleSmoothScrolling(e) {
  if (e.target.tagName === "A" && e.target.hash && document.querySelector(e.target.hash)) {
e.preventDefault()
document.querySelector(e.target.hash).scrollIntoView({ behavior: "smooth" })
  }
}

// Contact form submission (unchanged)
function handleContactFormSubmission(e) {
  e.preventDefault()
  // Placeholder for AJAX or form handling logic
  alert("Thank you for contacting us! We'll get back to you soon.")
}
