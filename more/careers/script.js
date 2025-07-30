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
document.addEventListener('DOMContentLoaded', function() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const stories = document.querySelectorAll('.story-card');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    const cat = this.getAttribute('data-category');
                    stories.forEach(story => {
                        if (cat === 'all' || story.getAttribute('data-category') === cat) {
                            story.style.display = '';
                        } else {
                            story.style.display = 'none';
                        }
                    });
                });
            });
        });


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
function showPathwayRecommendation() {
  const form = document.getElementById("pathwaysForm")
  if (!form) return

  const role = form.querySelector('input[name="role"]:checked')?.value
  const destination = form.querySelector('input[name="destination"]:checked')?.value
  const experience = form.querySelector('input[name="experience"]:checked')?.value

  let pathwayKey = ""
  if (role === "nurse" && destination === "uk" && experience === "fresh") {
    pathwayKey = "nurse-uk-fresh"
  } else if (role === "nurse" && destination === "usa" && ["1-3", "3-5", "5+"].includes(experience)) {
    pathwayKey = "nurse-usa-1-3"
  } else if (role === "doctor" && destination === "uk" && ["3-5", "5+"].includes(experience)) {
    pathwayKey = "doctor-uk-3-5"
  } else if (role === "allied" && destination === "uk" && experience === "5+") {
    pathwayKey = "allied-uk-5+"
  }

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
            document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
                });
            });
            });

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

/*Add your page js here*/
        // Optional: Scroll with mouse drag for modern UX
        (function() {
            const scrollEl = document.querySelector('.job-search-fields.horizontal-scroll');
            let isDown = false, startX, scrollLeft;
            if (!scrollEl) return;
            scrollEl.addEventListener('mousedown', (e) => {
                isDown = true;
                scrollEl.classList.add('scrolling');
                startX = e.pageX - scrollEl.offsetLeft;
                scrollLeft = scrollEl.scrollLeft;
            });
            scrollEl.addEventListener('mouseleave', () => {
                isDown = false;
                scrollEl.classList.remove('scrolling');
            });
            scrollEl.addEventListener('mouseup', () => {
                isDown = false;
                scrollEl.classList.remove('scrolling');
            });
            scrollEl.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - scrollEl.offsetLeft;
                const walk = (x - startX) * 1.5; // scroll-fast
                scrollEl.scrollLeft = scrollLeft - walk;
            });
        })();
        document.addEventListener('DOMContentLoaded', function () {
            // Collect all job data from .job-bar elements
            function getAllJobs() {
                return Array.from(document.querySelectorAll('.job-bar')).map(bar => {
                    const job = JSON.parse(bar.getAttribute('data-job'));
                    job._element = bar;
                    return job;
                });
            }
            // Map country values to display names for matching
            const countryMap = {
                uk: "United Kingdom",
                usa: "United States",
                canada: "Canada",
                australia: "Australia",
                newzealand: "New Zealand",
                germany: "Germany",
                middleeast: "Middle East",
                india: "India",
                other: "Other"
            };
            // Map role values to display names for matching
            const roleMap = {
                nurse: "Nurse",
                doctor: "Doctor",
                radiographer: "Radiographer",
                technician: "Technician",
                pharmacist: "Pharmacist",
                allied: "Allied Health"
            };
            // Experience mapping
            function experienceMatch(jobExp, filterExp) {
                if (!filterExp) return true;
                if (!jobExp) return false;
                if (filterExp === "5plus") return jobExp.includes("5+");
                return jobExp.startsWith(filterExp);
            }
            // Filtering function
            function filterJobs(jobs, filters) {
                return jobs.filter(job => {
                    // Keyword: match in title or location (case-insensitive, partial)
                    if (filters.keyword) {
                        const kw = filters.keyword.toLowerCase();
                        if (
                            !(job.title && job.title.toLowerCase().includes(kw)) &&
                            !(job.location && job.location.toLowerCase().includes(kw))
                        ) return false;
                    }
                    // Country
                    if (filters.country) {
                        if (!job.country || job.country.toLowerCase() !== (countryMap[filters.country] || "").toLowerCase()) return false;
                    }
                    // Role
                    if (filters.role) {
                        if (!job.role || job.role.toLowerCase() !== (roleMap[filters.role] || "").toLowerCase()) return false;
                    }
                    // Experience
                    if (filters.experience) {
                        if (!experienceMatch(job.experience, filters.experience)) return false;
                    }
                    // Location
                    if (filters.location) {
                        const loc = filters.location.toLowerCase();
                        if (!job.location || !job.location.toLowerCase().includes(loc)) return false;
                    }
                    return true;
                });
            }
            // Render jobs to #jobResults (if search), else show all in .jobs-bar-list
            function renderJobs(jobs, container) {
                if (!container) return;
                if (jobs.length === 0) {
                    container.innerHTML = '<div style="padding:2em;text-align:center;color:#1976d2;font-weight:600;">No jobs found matching your criteria.</div>';
                    return;
                }
                container.innerHTML = jobs.map(job => {
                    // Use the same markup as .job-bar
                    return `<div class="job-bar" data-job='${JSON.stringify(job).replace(/'/g, "&apos;")}'>
                        <span class="job-flag-title">
                            <img src="${job.flag}" alt="${job.country}" class="job-flag" style="display:inline-block;width:28px;height:18px;border-radius:3px;box-shadow:0 1px 2px #ccc;margin-right:8px;">
                            <span class="job-role">${job.title}</span>
                        </span>
                        <span class="job-country">${job.country}</span>
                        <span class="job-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                        <span class="job-type"><i class="${job.role && job.role.toLowerCase().includes('nurse') ? 'fas fa-user-nurse' : job.role && job.role.toLowerCase().includes('doctor') ? 'fas fa-user-md' : 'fas fa-stethoscope'}"></i> ${job.role}</span>
                        <span class="job-experience"><i class="fas fa-briefcase"></i> ${job.experience}</span>
                        <button class="btn btn-outline-primary btn-sm learn-more-btn">Learn More</button>
                    </div>`;
                }).join("");
            }
            // Attach event for Learn More buttons in search results
            function attachLearnMoreHandlers(container) {
                if (!container) return;
                container.querySelectorAll('.learn-more-btn').forEach(btn => {
                    btn.addEventListener('click', function (e) {
                        const card = e.target.closest('.job-bar');
                        const job = JSON.parse(card.getAttribute('data-job'));
                        document.getElementById('jobDescTitle').textContent = job.title + " - " + job.country;
                        document.getElementById('jobDescBody').innerHTML = `
                            <div style="margin-bottom:1em;">
                                <strong>Location:</strong> ${job.location}<br>
                                <strong>Experience:</strong> ${job.experience}<br>
                                <strong>Role:</strong> ${job.role}
                            </div>
                            <div>${job.desc}</div>
                        `;
                        document.getElementById('jobDescModal').style.display = 'block';
                    });
                });
            }
            // On form submit
            document.getElementById('jobSearchForm').addEventListener('submit', function (e) {
                e.preventDefault();
                const filters = {
                    keyword: document.getElementById('keyword').value.trim(),
                    country: document.getElementById('country').value,
                    role: document.getElementById('role').value,
                    experience: document.getElementById('experience').value,
                    location: document.getElementById('location').value.trim()
                };
                const jobs = getAllJobs();
                const filtered = filterJobs(jobs, filters);
                const resultsContainer = document.getElementById('jobResults');
                renderJobs(filtered, resultsContainer);
                attachLearnMoreHandlers(resultsContainer);
                // Hide original list if searching, show if all filters empty
                document.getElementById('jobsList').style.display = (filters.keyword || filters.country || filters.role || filters.experience || filters.location) ? 'none' : '';
                resultsContainer.style.display = (filters.keyword || filters.country || filters.role || filters.experience || filters.location) ? '' : 'none';
            });
            // Reset search results when all filters are cleared
            ['keyword','country','role','experience','location'].forEach(id => {
                document.getElementById(id).addEventListener('input', function () {
                    const filters = {
                        keyword: document.getElementById('keyword').value.trim(),
                        country: document.getElementById('country').value,
                        role: document.getElementById('role').value,
                        experience: document.getElementById('experience').value,
                        location: document.getElementById('location').value.trim()
                    };
                    if (!filters.keyword && !filters.country && !filters.role && !filters.experience && !filters.location) {
                        document.getElementById('jobResults').style.display = 'none';
                        document.getElementById('jobsList').style.display = '';
                    }
                });
            });
        });
            // Learn More modal logic
            document.addEventListener('DOMContentLoaded', function () {
                const modal = document.getElementById('jobDescModal');
                const closeBtn = document.getElementById('closeJobDescModal');
                function attachLearnMore() {
                    document.querySelectorAll('.learn-more-btn').forEach(btn => {
                        btn.addEventListener('click', function (e) {
                            const card = e.target.closest('.job-bar');
                            const job = JSON.parse(card.getAttribute('data-job'));
                            document.getElementById('jobDescTitle').textContent = job.title + " - " + job.country;
                            document.getElementById('jobDescBody').innerHTML = `
                                <div style="margin-bottom:1em;">
                                    <strong>Location:</strong> ${job.location}<br>
                                    <strong>Experience:</strong> ${job.experience}<br>
                                    <strong>Role:</strong> ${job.role}
                                </div>
                                <div>${job.desc}</div>
                            `;
                            modal.style.display = 'block';
                        });
                    });
                }
                attachLearnMore();
                closeBtn.addEventListener('click', function () {
                    modal.style.display = 'none';
                });
                window.addEventListener('click', function (e) {
                    if (e.target === modal) modal.style.display = 'none';
                });
            });
