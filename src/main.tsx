import 'preact/compat';
import { render } from 'preact';
import './styles.css';
import { App, resume } from './app';
import { loadProgress } from './storage/progress';

// Saved progress first (IndexedDB is quick; gives up after 500ms), then the first render.
loadProgress().then((saved) => {
  resume(saved);
  render(<App />, document.getElementById('app')!);
});
