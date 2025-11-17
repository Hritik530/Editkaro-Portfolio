// Navigation toggle for smaller screens
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth scroll & active nav link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70; // offset for navbar height
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Portfolio filtering logic
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Set active this button
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Video modal logic
const modal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const closeModalBtn = document.getElementById('close-modal');

document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const videoSrc = btn.getAttribute('data-video');
    modalVideo.src = videoSrc;
    modal.classList.remove('hidden');
    modalVideo.play();
  });
});

closeModalBtn.addEventListener('click', () => {
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.src = '';
  modal.classList.add('hidden');
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = '';
    modal.classList.add('hidden');
  }
});

// Scroll animations based on Intersection Observer
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
