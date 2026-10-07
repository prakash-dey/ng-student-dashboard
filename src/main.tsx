import 'preact/compat';
import { render } from 'preact';
import './styles.css';
import { App } from './app';

// Progress is no longer saved on the device: remove what earlier versions stored.
try { indexedDB.deleteDatabase('navgurukul-admission'); } catch { /* storage unavailable */ }

render(<App />, document.getElementById('app')!);
