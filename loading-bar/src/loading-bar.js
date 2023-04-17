import { LitElement, html, css } from 'lit';

class LoadingBar extends LitElement {
  static properties = {
    header: { type: String },
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
      margin-bottom: 10px;
    }

    .progress {
      height: 100%;
      background-color: #4CAF50;
      width: 0;
      animation: progress 60s linear forwards;
      border-radius: 5px;
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
      100% {
        width: 100%;
      }
    }
  `;

  constructor() {
    super();
    this.header = 'My app';
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
        <div class="loading-bar">
          <div class="progress"></div>
          <div class="timer">0s</div>
        </div>
        <div class="loading-bar">
          <div class="progress"></div>
          <div class="timer">0s</div>
        </div>
        <div class="loading-bar">
          <div class="progress"></div>
          <div class="timer">0s</div>
        </div>
      </main>
    `;
  }

  firstUpdated() {
    const progressBars = this.shadowRoot.querySelectorAll('.progress');
    const timers = this.shadowRoot.querySelectorAll('.timer');
    const progressTimes = [3790, 31250, 42610];

    for (let i = 0; i < progressBars.length; i++) {
      const progressBar = progressBars[i];
      const timer = timers[i];
      const progressTime = progressTimes[i];

      setTimeout(() => {
        progressBar.style.animationPlayState = 'paused';
      }, progressTime);

      let startTime = Date.now();

      function updateTime(elapsedTime, timerElement) {
        const seconds = Math.floor(elapsedTime / 1000);
        const milliseconds = Math.floor((elapsedTime % 1000) / 10);
        timerElement.innerText = `${seconds}.${milliseconds.toString().padStart(2, '0')}s`;
      }

      function updateTimer() {
        let elapsedTime = Date.now() - startTime;
        if (elapsedTime >= progressTime) {
          elapsedTime = progressTime;
          clearInterval(timerInterval);
        }
        updateTime(elapsedTime, timer);
      }

      const timerInterval = setInterval(updateTimer, 10);
    }
  }
}

customElements.define('loading-bar', LoadingBar);
