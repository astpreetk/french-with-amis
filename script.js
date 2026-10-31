
/* =========================================
   FRENCH WITH AMIS
   Website JavaScript
   ========================================= */

"use strict";

// CONTACT EMAIL
const CONTACT_EMAIL = "astpreetgill@gmail.com";

// =========================================
// 1. TEACHER PROFILE INFORMATION
// =========================================

// Edit these biographies with your real details.
// Do not add qualifications or experience
// unless they are accurate.

const profiles = {
  astpreet: {
    name: "Astpreet",
    role: "Co-Founder | French with Amis",
    paragraphs: [
      "Bonjour! My name is Astpreet, and I am one of the co-founders of French with Amis.",

      "I have a background in software development and a strong interest in making learning resources clear, organized, and easy to understand.",

      "Through French with Amis, my goal is to help students learn French step by step, build their confidence, and develop useful speaking, writing, vocabulary, and grammar skills.",

      "I believe that consistent practice, helpful study materials, and a supportive learning environment can make the French learning journey more enjoyable.",

      "I am excited to welcome you to our French learning community!"
    ]
  },

  komalpreet: {
    name: "Komalpreet",
    role: "Co-Founder | French with Amis",
    paragraphs: [
      "Bonjour! My name is Komalpreet, and I am one of the co-founders of French with Amis.",

      "Together with Astpreet, I am helping build a welcoming space for students who want to learn French.",

      "Our website brings together structured lessons, useful notes, speaking practice, writing resources, and practical learning tips.",

      "We want students to feel encouraged as they develop their language skills and work toward their individual learning goals.",

      "I look forward to being part of your French learning journey!"
    ]
  }
};

// =========================================
// 2. CLICKABLE TEACHER PROFILES
// =========================================

const modal = document.getElementById("profileModal");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalBio = document.getElementById("modalBio");
const closeModalButton = document.getElementById("closeModal");

let lastFocusedElement = null;

function openProfile(profileKey) {
  const profile = profiles[profileKey];

  if (!profile || !modal) {
    return;
  }

  lastFocusedElement = document.activeElement;

  modalName.textContent = profile.name;
  modalRole.textContent = profile.role;

  // Clear previous biography
  modalBio.replaceChildren();

  // Safely create biography paragraphs
  profile.paragraphs.forEach(function(paragraphText) {
    const paragraph = document.createElement("p");
    paragraph.textContent = paragraphText;
    modalBio.appendChild(paragraph);
  });

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
  closeModalButton.focus();
}

function closeProfile() {
  if (!modal) {
    return;
  }

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

// Attach profile buttons
document.querySelectorAll("[data-profile]").forEach(
  function(button) {
    button.addEventListener("click", function() {
      const profileKey = button.dataset.profile;
      openProfile(profileKey);
    });
  }
);

// Close button
if (closeModalButton) {
  closeModalButton.addEventListener(
    "click",
    closeProfile
  );
}

// Close by clicking outside the modal
if (modal) {
  modal.addEventListener("click", function(event) {
    if (event.target === modal) {
      closeProfile();
    }
  });

  // Keyboard support
  modal.addEventListener("keydown", function(event) {
    if (event.key !== "Tab") return;

    const focusable = Array.from(
      modal.querySelectorAll(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(function(element) {
      return !element.disabled;
    });

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey &&
        document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey &&
               document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

// Close with Escape
document.addEventListener("keydown", function(event) {
  if (
    event.key === "Escape" &&
    modal &&
    modal.classList.contains("show")
  ) {
    closeProfile();
  }
});

// =========================================
// 3. MOBILE SIDEBAR MENU
// =========================================

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

function setMenuOpen(isOpen) {
  if (!sidebar || !menuToggle) return;

  sidebar.classList.toggle("open", isOpen);
  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuToggle.setAttribute(
    "aria-label",
    isOpen
      ? "Close navigation menu"
      : "Open navigation menu"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
}

if (menuToggle && sidebar) {

  menuToggle.addEventListener("click", function() {
    const isOpen = sidebar.classList.contains("open");
    setMenuOpen(!isOpen);
  });

  // Close menu after selecting a section
  sidebar.querySelectorAll("a").forEach(
    function(link) {
      link.addEventListener("click", function() {
        setMenuOpen(false);
      });
    }
  );

  // Close when clicking outside
  document.addEventListener("click", function(event) {
    const menuIsOpen = sidebar.classList.contains("open");

    if (
      menuIsOpen &&
      !sidebar.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  // Close with Escape
  document.addEventListener("keydown", function(event) {
    if (
      event.key === "Escape" &&
      sidebar.classList.contains("open")
    ) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
}

// =========================================
// 4. ENROLLMENT FORM
// =========================================

// This is an email inquiry form.
// It opens the student's email application.
// It does not automatically save registrations.

const enrollmentForm = document.getElementById(
  "enrollmentForm"
);

const formStatus = document.getElementById(
  "formStatus"
);

if (enrollmentForm) {

  enrollmentForm.addEventListener(
    "submit",
    function(event) {
      event.preventDefault();

      if (!enrollmentForm.reportValidity()) {
        return;
      }

      const studentName = document.getElementById(
        "studentName"
      ).value.trim();

      const studentEmail = document.getElementById(
        "studentEmail"
      ).value.trim();

      const studentCourse = document.getElementById(
        "studentCourse"
      ).value;

      const studentMessage = document.getElementById(
        "studentMessage"
      ).value.trim();

      const subject =
        "French with Amis - Enrollment Inquiry: " +
        studentCourse;

      const body =
        "Bonjour French with Amis!\n\n" +
        "I am interested in your French course.\n\n" +
        "Student Name: " + studentName + "\n" +
        "Student Email: " + studentEmail + "\n" +
        "Selected Course: " + studentCourse + "\n\n" +
        "Message:\n" +
        (studentMessage || "No additional message.") +
        "\n\n" +
        "Thank you!";

      const mailtoLink =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      if (formStatus) {
        formStatus.textContent =
          "Your email application should open. " +
          "Please press Send in your email application " +
          "to complete your inquiry.";
      }

      window.location.href = mailtoLink;
    }
  );
}

// =========================================
// 5. ACTIVE SIDEBAR LINKS
// =========================================

const navigationLinks = document.querySelectorAll(
  '.sidebar nav a[href^="#"]'
);

navigationLinks.forEach(function(link) {

  link.addEventListener("click", function() {

    navigationLinks.forEach(function(otherLink) {
      otherLink.classList.remove("active");
    });

    link.classList.add("active");
  });

});

// =========================================
// 6. AUTOMATIC COPYRIGHT YEAR
// =========================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// =========================================
// 7. WEBSITE READY
// =========================================

console.log("French with Amis website loaded!");
