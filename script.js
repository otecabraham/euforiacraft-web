// Mobile menu toggle
const mobileToggle = document.getElementById("mobileToggle")
const navMenu = document.getElementById("navMenu")

mobileToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")

  // Animate hamburger icon
  const spans = mobileToggle.querySelectorAll("span")
  spans[0].style.transform = navMenu.classList.contains("active") ? "rotate(45deg) translate(5px, 5px)" : "none"
  spans[1].style.opacity = navMenu.classList.contains("active") ? "0" : "1"
  spans[2].style.transform = navMenu.classList.contains("active") ? "rotate(-45deg) translate(7px, -6px)" : "none"
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    const spans = mobileToggle.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offset = 80 // Account for fixed navbar
      const targetPosition = target.offsetTop - offset
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Copy IP address functionality
const copyBtn = document.getElementById("copyBtn")
const serverIP = document.getElementById("serverIP").textContent

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(serverIP)

    // Visual feedback
    const originalHTML = copyBtn.innerHTML
    copyBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
        `
    copyBtn.style.background = "linear-gradient(135deg, #00ff88, #00cc6a)"

    setTimeout(() => {
      copyBtn.innerHTML = originalHTML
      copyBtn.style.background = ""
    }, 2000)
  } catch (err) {
    console.error("Failed to copy:", err)
  }
})

// Simulate server status (replace with actual API call)
function updateServerStatus() {
  const statusDot = document.getElementById("statusDot")
  const statusText = document.getElementById("statusText")
  const playerCount = document.getElementById("playerCount")

  // Simulate online status
  const isOnline = true // Replace with actual server check

  if (isOnline) {
    statusDot.style.background = "#00ff88"
    statusText.textContent = "Server Online"
    statusText.style.color = "#00ff88"

    // Simulate random player count
    const count = Math.floor(Math.random() * 50) + 200
    playerCount.textContent = count
  } else {
    statusDot.style.background = "#ff4444"
    statusText.textContent = "Server Offline"
    statusText.style.color = "#ff4444"
    playerCount.textContent = "0"
  }
}

// Update status on load and every 30 seconds
updateServerStatus()
setInterval(updateServerStatus, 30000)

// Navbar scroll effect
let lastScroll = 0
const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.style.background = "rgba(10, 10, 15, 0.95)"
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)"
  } else {
    navbar.style.background = "rgba(10, 10, 15, 0.8)"
    navbar.style.boxShadow = "none"
  }

  lastScroll = currentScroll
})

// Contact form handling
const contactForm = document.getElementById("contactForm")
const formSuccess = document.getElementById("formSuccess")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Get form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  }

  // Here you would typically send the data to your backend
  // For now, we'll just show a success message
  console.log("Form submitted:", formData)

  // Show success message
  formSuccess.classList.add("show")
  contactForm.reset()

  // Hide success message after 5 seconds
  setTimeout(() => {
    formSuccess.classList.remove("show")
  }, 5000)

  // Example: Send to a backend endpoint
  // try {
  //     const response = await fetch('/api/contact', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(formData)
  //     });
  //     if (response.ok) {
  //         formSuccess.classList.add('show');
  //         contactForm.reset();
  //     }
  // } catch (error) {
  //     console.error('Error:', error);
  // }
})

// Add scroll reveal animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all cards and sections
document.querySelectorAll(".vip-card, .rule-card, .stat-card, .contact-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

