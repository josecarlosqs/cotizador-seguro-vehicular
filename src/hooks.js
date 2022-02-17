import {
  useEffect,
  useRef
} from 'react';

export const ScreenModes = {
  mobile: 'MOBILE',
  desktop: 'DESKTOP'
}

export function useScreenBreakpoint (handlerFn) {
  const mm = matchMedia("(max-width: 768px)");
  
  useEffect(() => {

    const handleMatchMediaChange = () => {
      handlerFn(mm.matches ? ScreenModes.mobile : ScreenModes.desktop)
    }

    mm.addEventListener("change", handleMatchMediaChange);
  
    handlerFn(mm.matches ? ScreenModes.mobile : ScreenModes.desktop)

    return function cleanup () {
      mm.removeEventListener('change', handleMatchMediaChange);
    }
  });
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}