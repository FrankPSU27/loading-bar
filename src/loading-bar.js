import { LitElement, html, css } from 'lit';

class LoadingBar extends LitElement {
  static get properties() {
    return {
      header: { type: String },
      duration: { type: Number },
      startTime: { type: Number },
      timerInterval: { attribute: false },
      progress: { attribute: false },
      progressWidth: { attribute: false },
      timerValue: { attribute: false }
    };
  }

  static styles = css`
    :host {
      display: block;
    }
    .title{
      text-align: center;
}
.box {
			border: 1px solid black;
			padding: 20px;
			margin: 20px;
			max-width: 800px;
			background-color: #fff;
			color: #000;
			font-family: Arial, sans-serif;
      margin-left: auto;
      margin-right: auto;
		}
		
		.list {
			list-style: none;
			padding: 0;
			margin: 0;
		}
		
		.list li {
			margin-bottom: 10px;
			font-size: 16px;
		}
		
		.heading {
			font-family: Arial, sans-serif;
			font-size: 24px;
			margin-bottom: 10px;
		}

    .loading-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.loading-name {
  width: 100px;
  font-size: 14px;
  margin-right: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 7px;
}

.loading-bar {
  height: 30px;
  background-color: #ddd;
  border: 3px solid #000;
  border-radius: 5px;
  padding: 5px;
  position: relative;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.progress {
  height: 100%;
  width: 0;
  border-radius: 5px;
  animation: progress 100s linear forwards;
  background: linear-gradient(to right, yellow, orange);
}

.timer {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  padding: 5px;
}

@keyframes progress {
  0% {
    width: 0;
  }
  50% {
    width: 50%;
  }
  100% {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .progress {
    animation: none;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .progress:nth-child(2) {
    animation: progress-50 100s linear forwards;
  }
  .progress:nth-child(3) {
    animation: progress-50-100 100s linear forwards;
  }
}

@keyframes progress-50 {
  0% {
    width: 0;
  }
  50% {
    width: 50%;
  }
  100% {
    width: 50%;
  }
}

@keyframes progress-50-100 {
  0% {
    width: 0;
  }
  50% {
    width: 50%;
  }
  100% {
    width: 100%;
  }
}
  `;

  constructor() {
    super();
    this.header = 'My app';
    this.startTime = 0;
    this.duration = 10000; // 10 seconds
    this.timerDisplay = null;
    this.progressBar = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.startTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopTimer();
  }

  startTimer() {
    this.startTime = Date.now();
    const timer = setInterval(() => {
      const timePassed = Date.now() - this.startTime;
      const timeLeft = this.duration - timePassed;

      // update timer 
      const timerValue = this.formatTime(timeLeft);
      this.timerDisplay.textContent = timerValue;

      // update progrogess
      const progress = Math.round((timePassed / this.duration) * 100);
      this.progressBar.style.width = `${progress}%`;

      if (timeLeft < 0) {
        clearInterval(timer);
        this.timerDisplay.textContent = this.formatTime(0);
        this.onComplete();
      }
    }, 10);
    this.timerInterval = timer;
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  formatTime(milliseconds) {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  render() {
    return html`
      <main>
      <h1 class="title">Loading Bar</h1>
<div class="box">
		<div class="heading">This Project is to demonstrate the following:</div>
		<ul class="list">
			<li>Endpoint that returns the list of data (could be vercel or just a static json file)</li>
			<li>Map through it and display the results (list element)</li>
			<li>Research how to do an animation to fill the container based on time involved. Count up from this.start to the time in question to display how long something takes. Start defaults to 0 but should be able to do any starting point.</li>
			<li>Time mode but also a basic "count to X in Y seconds" for things like "we've got 12,000 sites vs the other guy only has 125"</li>
			<li>Color option per product to fade from 1 color to the other. This should be CSS variable driven but backgrounds do support gradients / fading</li>
			<li>Tag for bar, for row, for app talking to the endpoint</li>
			<li>Alt / title type of accessibility area to indicate to non-sighted user what's going on here. "A bar graph animation showing how long it takes for X to be installed" or some kind of equivalent statement</li>
			<li>Only start loading when visible (need to use intersection observers to ensure that it's visible when someone gets to it)</li>
			<li>Accessibility enhancement -- if user has Prefers reduced motion, still only load when visible but jump from 0 to 50% to 100% -- https://web.dev/prefers-reduced-motion/</li>
			<li>Mobile support that's scaled down / responses well</li>
		</ul>
	</div>
  <div class="box">
		<div class="heading">This Project is to demonstrate the following:</div>
		<ul class="list">
			<li>Endpoint that returns the list of data (could be vercel or just a static json file)</li>
			<li>Map through it and display the results (list element)</li>
			<li>Research how to do an animation to fill the container based on time involved. Count up from this.start to the time in question to display how long something takes. Start defaults to 0 but should be able to do any starting point.</li>
			<li>Time mode but also a basic "count to X in Y seconds" for things like "we've got 12,000 sites vs the other guy only has 125"</li>
			<li>Color option per product to fade from 1 color to the other. This should be CSS variable driven but backgrounds do support gradients / fading</li>
			<li>Tag for bar, for row, for app talking to the endpoint</li>
			<li>Alt / title type of accessibility area to indicate to non-sighted user what's going on here. "A bar graph animation showing how long it takes for X to be installed" or some kind of equivalent statement</li>
			<li>Only start loading when visible (need to use intersection observers to ensure that it's visible when someone gets to it)</li>
			<li>Accessibility enhancement -- if user has Prefers reduced motion, still only load when visible but jump from 0 to 50% to 100% -- https://web.dev/prefers-reduced-motion/</li>
			<li>Mobile support that's scaled down / responses well</li>
		</ul>
	</div>
        <div class="loading-wrapper">
  <div class="loading-name">Bar One</div>
  <div class="loading-bar">
    <div class="progress"></div>
    <div class="timer">0s</div>
  </div>
</div>
<div class="loading-wrapper">
  <div class="loading-name">Bar Two</div>
  <div class="loading-bar">
    <div class="progress"></div>
    <div class="timer">0s</div>
  </div>
</div>
<div class="loading-wrapper">
  <div class="loading-name">Bar Three</div>
  <div class="loading-bar">
    <div class="progress"></div>
    <div class="timer">0s</div>
  </div>
</div>
      </main>
    `;
  }

  firstUpdated() {
    const progressBars = this.shadowRoot.querySelectorAll('.progress');
    const timers = this.shadowRoot.querySelectorAll('.timer');
    const progressTimes = [37900, 54250, 100000];

function updateTime(elapsedTime, timerElement) {
  const seconds = Math.floor(elapsedTime / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  timerElement.innerText = `${seconds}.${milliseconds.toString().padStart(2, '0')}s`;
}

function updateTimer(progressBar, timer, progressTime) {
  let startTime = Date.now();
  let elapsedTime = 0;
  let timerInterval;


  function step() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    if (elapsedTime >= progressTime) {
      elapsedTime = progressTime;
      clearInterval(timerInterval);
    }

    updateTime(elapsedTime, timer);
    const percentage = elapsedTime / progressTime * 100;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      
      if (percentage >= 50) {
        progressBar.style.width = '50%';
      }
      if (percentage >= 100) {
        progressBar.style.width = '100%';
      }
    } else {
      // Reduce motion is disabled
      progressBar.style.width = percentage + '%';
    }
  }

  timerInterval = setInterval(step, 10);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBar = entry.target.querySelector('.progress');
      const timer = entry.target.querySelector('.timer');
      const progressTime = progressTimes[Array.from(progressBars).indexOf(progressBar)];
      
      setTimeout(() => {
        progressBar.style.animationPlayState = 'paused';
      }, progressTime);

      updateTimer(progressBar, timer, progressTime);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

progressBars.forEach((progressBar) => {
  observer.observe(progressBar.parentNode);
});

  }
}

customElements.define('loading-bar', LoadingBar);
  
  
  