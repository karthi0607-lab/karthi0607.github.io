// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const scrollProgressBar = document.getElementById('scrollProgressBar');
const typingTextElement = document.getElementById('typing-text');
const htmlElement = document.documentElement;

// Typing Animation data
const typingRoles = [
    "AI & Data Science Student",
    "Aspiring AI Engineer",
    "Prompt Engineer",
    "Problem Solver"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

// Theme Management
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.querySelector('i').classList.toggle('fa-times');
    navToggle.querySelector('i').classList.toggle('fa-bars');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.querySelector('i').classList.remove('fa-times');
        navToggle.querySelector('i').classList.add('fa-bars');
    });
});

// Sticky Navbar & Scroll Progress
window.addEventListener('scroll', () => {
    // Sticky Navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgressBar.style.width = scrolled + '%';

    // Active Link Highlighting
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Typing Animation Logic
function typeEffect() {
    const currentRole = typingRoles[roleIndex];

    if (isDeleting) {
        typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % typingRoles.length;
        typeSpeed = 500; // Pause before typing new
    }

    setTimeout(typeEffect, typeSpeed);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
});

// Initialize Typing Animation
document.addEventListener('DOMContentLoaded', typeEffect);
