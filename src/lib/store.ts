import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { nanoid } from "nanoid";

type SessionInfo = {
  username: string;
  roles: string[];
  invalidAt: number;
}

type Sid = string;

const sessionStore = new Map<Sid, SessionInfo>();
let nextClean = Date.now() * 1000 * 60 * 60;

const clean = () => {
  const now = Date.now();
  for (const [sid, session] of sessionStore) {
    if (session.invalidAt < now) {
      sessionStore.delete(sid);
    }
  }
  nextClean = Date.now() * 1000 * 60 * 60;
}

const getSid = (): Sid => {
  return nanoid(48);
}

export const createSession = (username: string, maxAge: number) => {
  let sid: Sid = "";

  do {
    sid = getSid();
  } while (sessionStore.has(sid));

  // const roles = getUserRoles(username);
  let roles = ['', '', ''];

  sessionStore.set(sid, {
    username,
    roles,
    invalidAt: Date.now() + maxAge
  })

  if (Date.now() > nextClean) {
    setTimeout(() => {
      clean();
    }, 5000);
  }

  return sid;
}

export const getSession = (sid: Sid): SessionInfo | undefined => {
  const session = sessionStore.get(sid);
  if (session) {
    if (Date.now() > session.invalidAt) {
      sessionStore.delete(sid);
      return undefined
    } else {
      return session;
    }
  } else {
    return undefined;
  }
}

export const deleteSession = (sid: Sid): void => { sessionStore.delete(sid); }

const createWritableStore = (key: string, startValue: object | string | boolean) => {
  const { subscribe, set } = writable(startValue);

  return {
    subscribe,
    set,
    useLocalStorage: () => {
      if (browser) {
        const json = localStorage.getItem(key);
        if (json) {
          set(JSON.parse(json));
        }

        subscribe(current => {
          localStorage.setItem(key, JSON.stringify(current));
        });
      }
    }
  }
}

export const theme = createWritableStore('theme', { mode: 'dark', color: 'blue' });
export const transitionUser = createWritableStore('transitionUser', {});
export const mfa = createWritableStore('mfa', false);
export const signupConfirm = createWritableStore('signupConfirm', false);