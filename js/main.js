// Main JavaScript file for Space Explorer website

document.addEventListener('DOMContentLoaded', () => {
  // Navigation scroll effect
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('toggle');
    });
  }

  // Fetch planets data for the planets page
  const planetsGrid = document.querySelector('.planets-grid');
  if (planetsGrid) {
    fetchPlanets();
  }

  // Fetch missions data for the exploration page
  const timelineContainer = document.querySelector('.timeline');
  if (timelineContainer) {
    fetchMissions();
  }

  // Handle contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  // Planet detail modal
  const planetModal = document.getElementById('planet-modal');
  if (planetModal) {
    const closeModal = document.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
      planetModal.classList.remove('active');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === planetModal) {
        planetModal.classList.remove('active');
      }
    });
  }
});

// Fetch planets from API
async function fetchPlanets() {
  try {
    const response = await fetch('/api/planets');
    const planets = await response.json();

    const planetsGrid = document.querySelector('.planets-grid');

    planets.forEach(planet => {
      const planetCard = createPlanetCard(planet);
      planetsGrid.appendChild(planetCard);
    });
  } catch (error) {
    console.error('Error fetching planets:', error);
  }
}

// Create planet card element
function createPlanetCard(planet) {
  const card = document.createElement('div');
  card.className = 'planet-card';
  card.dataset.id = planet.id;

  card.innerHTML = `
    <img src="${planet.image}" alt="${planet.name}" class="planet-img">
    <div class="planet-info">
      <h3>${planet.name}</h3>
      <p>${planet.description}</p>
      <button class="btn btn-sm view-details" data-id="${planet.id}">View Details</button>
    </div>
  `;

  // Add event listener to the button
  card.querySelector('.view-details').addEventListener('click', () => {
    showPlanetDetails(planet.id);
  });

  return card;
}

// Show planet details in modal
async function showPlanetDetails(planetId) {
  try {
    const response = await fetch(`/api/planets/${planetId}`);
    const planet = await response.json();

    const modal = document.getElementById('planet-modal');
    const modalContent = document.querySelector('.modal-content');

    modalContent.innerHTML = `
      <h2>${planet.name}</h2>
      <img src="${planet.image}" alt="${planet.name}" class="modal-img">
      <p>${planet.description}</p>
      <h3>Facts</h3>
      <ul>
        ${planet.facts.map(fact => `<li>${fact}</li>`).join('')}
      </ul>
    `;

    modal.classList.add('active');
  } catch (error) {
    console.error('Error fetching planet details:', error);
  }
}

// Fetch space missions
async function fetchMissions() {
  try {
    const response = await fetch('/api/missions');
    const missions = await response.json();

    const timeline = document.querySelector('.timeline');

    missions.forEach((mission, index) => {
      const timelineItem = document.createElement('div');
      timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;

      timelineItem.innerHTML = `
        <div class="timeline-content">
          <h3>${mission.name} (${mission.year})</h3>
          <p>${mission.description}</p>
          <img src="${mission.image}" alt="${mission.name}" class="timeline-img">
        </div>
      `;

      timeline.appendChild(timelineItem);
    });
  } catch (error) {
    console.error('Error fetching missions:', error);
  }
}

// Handle contact form submission
async function handleContactSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');
  const formMessage = document.getElementById('form-message');

  // Basic validation
  if (!nameInput.value || !emailInput.value || !messageInput.value) {
    formMessage.textContent = 'Please fill in all fields';
    formMessage.className = 'error';
    return;
  }

  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
      })
    });

    const data = await response.json();

    // Show success message
    formMessage.textContent = data.message;
    formMessage.className = 'success';

    // Reset form
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
  } catch (error) {
    console.error('Error submitting form:', error);
    formMessage.textContent = 'An error occurred. Please try again.';
    formMessage.className = 'error';
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
}

// Animate elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');

  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.classList.add('animated');
    }
  });
};

window.addEventListener('scroll', animateOnScroll); 