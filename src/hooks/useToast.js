import { useCallback, useEffect, useRef, useState } from "react";

/* Message temporaire (« Lien copié ! »…), affiché 1,8 s */
export function useToast(duration = 1800) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef();

  const show = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), duration);
  }, [duration]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return { message, visible, show };
}
