/**
 * Newsletter subscription functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
});

/**
 * Handle newsletter form submission
 */
async function handleNewsletterSubmit(e) {
  e.preventDefault();
  
  const emailInput = document.getElementById('newsletter-email');
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  
  // Basic validation
  if (!emailInput.value) {
    showNotification('Please enter your email address', 'error');
    return;
  }
  
  // Email format validation
  if (!isValidEmail(emailInput.value)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }
  
  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Subscribing...';
  
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailInput.value
      })
    });
    
    const data = await response.json();
    
    // Show success message
    showNotification(data.message, 'success');
    
    // Reset form
    emailInput.value = '';
  } catch (error) {
    console.error('Error submitting newsletter form:', error);
    showNotification('An error occurred. Please try again.', 'error');
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  }
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info', duration = 3000) {
  // Create notification element if it doesn't exist
  let notification = document.querySelector('.notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);
  }
  
  // Set notification content and type
  notification.textContent = message;
  notification.className = `notification ${type}`;
  
  // Show notification
  notification.classList.add('show');
  
  // Hide notification after duration
  setTimeout(() => {
    notification.classList.remove('show');
  }, duration);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
} 