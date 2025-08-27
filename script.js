const PROJECTS = [
  {
    id: "ai-resume",
    title: "AI Resume Analyzer",
    desc: "NLP pipeline that scores resumes vs. job descriptions and provides keyword suggestions and insights.",
    tags: ["ml","tooling"],
    tech: "Python (spaCy), Flask, React, Postgres, Docker",
    github: "https://github.com/yourusername/ai-resume-analyzer",
    live: "#",
    images: ["assets/project1-1.jpg","assets/project1-2.jpg"]
  },
  
];

const projectGrid = document.getElementById('project-grid');
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTech = document.getElementById('modal-tech');
const modalGithub = document.getElementById('modal-github');
const modalLive = document.getElementById('modal-live');
const slides = modal.querySelector('.slides');
const prevBtn = modal.querySelector('.prev');
const nextBtn = modal.querySelector('.next');
const modalCloseBtn = modal.querySelector('.modal-close');

let currentSlides = [];
let currentIndex = 0;

function renderProjects(list){
  projectGrid.innerHTML = '';
  list.forEach(p => {
    const el = document.createElement('article');
    el.className = 'project-card';
    el.tabIndex = 0;
    el.setAttribute('role','button');
    el.dataset.id = p.id;
    el.innerHTML = `
      <img src="${p.images[0] || 'assets/project-placeholder.png'}" alt="${p.title}" loading="lazy">
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div class="project-meta">
        <span class="pill">${p.tags[0].toUpperCase()}</span>
        <span><a href="${p.github}" target="_blank" rel="noopener">Code</a></span>
      </div>`;
    el.addEventListener('click', ()=> openProject(p.id));
    el.addEventListener('keydown', e => { if(e.key==='Enter') openProject(p.id) });
    projectGrid.appendChild(el);
  });
}

function openProject(id){
  const p = PROJECTS.find(x => x.id === id);
  if(!p) return;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalTech.textContent = p.tech;
  modalGithub.href = p.github;
  modalGithub.textContent = 'View on GitHub';
  modalLive.href = p.live;
  modalLive.textContent = p.live && p.live !== '#' ? 'Live demo' : 'Live demo (not available)';
  currentSlides = p.images || [];
  currentIndex = 0;
  renderSlides();
  modal.showModal?.() || (modal.style.display='block');
  modal.setAttribute('aria-hidden','false');
  modal.focus();
}

function renderSlides(){
  slides.innerHTML = '';
  currentSlides.forEach(src=>{
    const img = document.createElement('img');
    img.src = src;
    img.alt = modalTitle.textContent + ' screenshot';
    img.loading='lazy';
    slides.appendChild(img);
  });
  updateSlidePosition();
}

function updateSlidePosition(){
  const w = slides.clientWidth || 600;
  slides.style.transform = `translateX(-${currentIndex*w}px)`;
  prevBtn.style.display = nextBtn.style.display = currentSlides.length > 1 ? 'inline-flex' : 'none';
}

prevBtn.addEventListener('click', ()=> { currentIndex = (currentIndex-1+currentSlides.length)%currentSlides.length; updateSlidePosition(); });
nextBtn.addEventListener('click', ()=> { currentIndex = (currentIndex+1)%currentSlides.length; updateSlidePosition(); });
modalCloseBtn.addEventListener('click', ()=> { modal.close?.(); modal.setAttribute('aria-hidden','true'); });
document.addEventListener('keydown', e => { if(e.key==='Escape'){ modal.close?.(); modal.setAttribute('aria-hidden','true'); }});

renderProjects(PROJECTS);
document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".progress-bar");

  bars.forEach(bar => {
    const progress = bar.querySelector(".progress");
    const percentText = bar.querySelector(".percent");
    const value = bar.getAttribute("data-progress");
    
    let width = 0;
    const interval = setInterval(() => {
      if(width >= value){
        clearInterval(interval);
      } else {
        width++;
        progress.style.width = width + "%";
        percentText.textContent = width + "%";
      }
    }, 20);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".progress-bar");

  bars.forEach(bar => {
    const progress = bar.querySelector(".progress");
    const percentText = bar.querySelector(".percent");
    const value = bar.getAttribute("data-progress");

    let width = 0;
    const interval = setInterval(() => {
      if (width >= value) {
        clearInterval(interval);
      } else {
        width++;
        progress.style.width = width + "%";  
        percentText.textContent = width + "%"; 
      }
    }, 20); 
  });
});
