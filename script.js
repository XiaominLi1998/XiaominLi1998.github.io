const tagLabels = {
  agent: 'Agent',
  simulation: 'Simulation',
  safety: 'Safety',
  reasoning: 'Reasoning',
  'post-training': 'Post-training',
  'data-quality': 'Data Quality',
  'health-ai': 'Health AI',
  theory: 'Theory',
};

const paperTagAssignments = [
  ['agent', 'simulation'],
  ['agent'],
  ['agent'],
  ['agent'],
  ['agent', 'reasoning', 'post-training'],
  ['agent', 'simulation'],
  ['agent', 'simulation'],
  ['agent', 'simulation'],
  ['agent', 'reasoning', 'post-training'],
  ['agent', 'reasoning', 'post-training'],
  ['agent', 'reasoning', 'post-training'],
  ['agent', 'safety', 'reasoning'],
  ['agent', 'post-training'],
  ['agent', 'data-quality'],
  ['agent', 'simulation'],
  ['agent'],
  ['agent'],
  ['reasoning', 'post-training'],
  ['safety', 'reasoning', 'post-training'],
  ['agent', 'safety', 'reasoning'],
  ['safety', 'reasoning'],
  ['safety', 'post-training'],
  ['safety', 'reasoning'],
  ['safety', 'post-training'],
  ['safety', 'post-training'],
  ['reasoning', 'post-training'],
  ['safety', 'post-training'],
  ['reasoning', 'post-training'],
  ['reasoning', 'post-training'],
  ['reasoning'],
  ['safety', 'reasoning'],
  ['safety', 'data-quality'],
  ['post-training'],
  ['data-quality', 'post-training'],
  [],
  ['reasoning', 'post-training'],
  ['data-quality'],
  ['health-ai', 'safety'],
  ['health-ai', 'reasoning'],
  ['health-ai'],
  ['health-ai'],
  ['theory'],
  ['theory', 'reasoning'],
  ['theory'],
  ['theory'],
  ['theory'],
];

const publicationSection = document.querySelector('#publications');
const publicationGroups = [...publicationSection.querySelectorAll('.publication-group')];
const papers = [...publicationSection.querySelectorAll('.paper-list > li')];
const combinedList = document.createElement('ol');

combinedList.className = 'paper-list filtered-paper-list';

papers.forEach((paper, index) => {
  const tags = paperTagAssignments[index];
  paper.dataset.tags = tags.join(' ');

  const tagContainer = document.createElement('div');
  tagContainer.className = 'paper-tags';
  tagContainer.setAttribute('aria-label', 'Paper topics');

  tags.forEach((tag) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `paper-tag tag-${tag}`;
    button.dataset.filter = tag;
    button.textContent = tagLabels[tag];
    tagContainer.append(button);
  });

  paper.append(tagContainer);
  combinedList.append(paper);
});

publicationGroups[0].before(combinedList);
publicationGroups.forEach((group) => group.remove());

const filterButtons = [...document.querySelectorAll('.filter-button')];
const summary = document.querySelector('#publication-summary');

document.querySelector('.filter-button[data-filter="all"] span').textContent = papers.length;
Object.keys(tagLabels).forEach((tag) => {
  const count = papers.filter((paper) => paper.dataset.tags.split(' ').includes(tag)).length;
  document.querySelector(`.filter-button[data-filter="${tag}"] span`).textContent = count;
});

function setFilter(filter) {
  let visibleCount = 0;

  papers.forEach((paper) => {
    const isVisible = filter === 'all' || paper.dataset.tags.split(' ').includes(filter);
    paper.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  summary.textContent = filter === 'all'
    ? `Showing all ${visibleCount} papers.`
    : `Showing ${visibleCount} papers tagged ${tagLabels[filter]}.`;
}

publicationSection.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  setFilter(button.dataset.filter);
});

setFilter('all');