type HiddenMotion = { opacity: number; y: number };

let allowEntrance = false;

export function markEntranceReady() {
  allowEntrance = true;
}

export function shouldPlayEntrance() {
  return allowEntrance;
}

export function entranceInitial(reduced: boolean, hidden: HiddenMotion): HiddenMotion | false {
  if (reduced || !allowEntrance) return false;
  return hidden;
}
