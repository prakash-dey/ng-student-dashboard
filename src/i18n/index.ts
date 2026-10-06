// All copy. landing = About pages, journey = everything after, extra = the few strings the design kept in its logic.
import en from './en.json';
import hi from './hi.json';
import mr from './mr.json';

export type Lang = 'en' | 'hi' | 'mr';
export type Copy = typeof en;
export const I18N: Record<Lang, Copy> = { en, hi: hi as Copy, mr: mr as Copy };
