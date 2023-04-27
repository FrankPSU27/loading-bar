import { html } from 'lit';
import '../src/loading-bar.js';

export default {
  title: 'LoadingBar',
  component: 'loading-bar',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <loading-bar
      style="--loading-bar-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </loading-bar>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
