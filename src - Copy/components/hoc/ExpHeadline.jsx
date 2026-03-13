import React, { useEffect, useRef, useState } from 'react';

const ExpHeadline = ({
    phrases = ['Work Experience', 'I Have Worked At', 'Professional Journey'],
    // timings (ms)
    stay = 1800,       // how long each word stays visible
    transition = 380,  // clip open/close duration
}) => {
    const [i, setI] = useState(0);
    const [phase, setPhase] = useState('open'); // open -> hold -> close
    const timerRef = useRef();

    // Respect reduced motion
    const reduced = typeof window !== 'undefined'
        && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    useEffect(() => {
        if (reduced) return; // static text if reduced motion
        const run = () => {
            if (phase === 'open') {
                timerRef.current = setTimeout(() => setPhase('hold'), transition);
            } else if (phase === 'hold') {
                timerRef.current = setTimeout(() => setPhase('close'), stay);
            } else {
                timerRef.current = setTimeout(() => {
                    setI((p) => (p + 1) % phrases.length);
                    setPhase('open');
                }, transition);
            }
        };
        run();
        return () => clearTimeout(timerRef.current);
    }, [phase, phrases.length, stay, transition, reduced]);

    return (
        <>
            <style>{`
        .exp-headline {
          font-size: clamp(2.2rem, 4.5vw, 3rem);
          font-weight: 900;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: .5ch;
          margin-bottom: 24px;
          line-height: 1.1;
        }
        .exp-static {
          opacity: .85;
        }
        /* wrapper that clips the animated words */
        .clip-wrap {
          position: relative;
          display: inline-block;
          vertical-align: top;
          padding: 0 .3rem; /* slight breathing room inside clip */
          --clipW: 0%;
          --clipPad: .14em; /* controls top/bottom clip padding */
          transition: clip-path var(--t) ease, -webkit-clip-path var(--t) ease;
          -webkit-clip-path: inset(calc(50% - var(--clipPad)) 0 calc(50% - var(--clipPad)) 0 round 6px);
                  clip-path: inset(calc(50% - var(--clipPad)) 0 calc(50% - var(--clipPad)) 0 round 6px);
        }
        .clip-wrap.open {
          --t: var(--transition, 380ms);
          -webkit-clip-path: inset(0 0 0 0 round 6px);
                  clip-path: inset(0 0 0 0 round 6px);
        }
        .clip-wrap.hold {
          --t: 120ms;
          -webkit-clip-path: inset(0 0 0 0 round 6px);
                  clip-path: inset(0 0 0 0 round 6px);
        }
        .clip-wrap.close {
          --t: var(--transition, 380ms);
          -webkit-clip-path: inset(calc(50% - var(--clipPad)) 0 calc(50% - var(--clipPad)) 0 round 6px);
                  clip-path: inset(calc(50% - var(--clipPad)) 0 calc(50% - var(--clipPad)) 0 round 6px);
        }
        /* animated words */
        .clip-words {
          display: grid;
          position: relative;
        }
        .clip-word {
          grid-area: 1 / 1;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 220ms ease, transform 220ms ease;
          white-space: nowrap;
          background: linear-gradient(90deg, #2563eb, #0ea5e9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .clip-word.active {
          opacity: 1;
          transform: translateY(0);
        }

        /* optional underline accent for the whole headline */
        .exp-headline::after {
          content: '';
          display: block;
          height: 3px;
          width: 70%;
          margin-top: 8px;
          background: linear-gradient(90deg, #2563eb, #0ea5e9);
          border-radius: 2px;
        }

        /* reduced motion: no clipping/transition */
        @media (prefers-reduced-motion: reduce) {
          .clip-wrap, .clip-word { transition: none !important; }
          .clip-word { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

            <h2 className="exp-headline">
                {/* <span className="exp-static">Experience</span> */}
                <span
                    className={`clip-wrap ${reduced ? '' : phase}`}
                    style={{ ['--transition']: `${transition}ms` }}
                    aria-live="polite"
                >
                    <span className="clip-words">
                        {phrases.map((w, idx) => (
                            <span
                                key={w}
                                className={`clip-word ${idx === i ? 'active' : ''}`}
                                aria-hidden={idx !== i}
                            >
                                {w}
                            </span>
                        ))}
                    </span>
                </span>
            </h2>
        </>
    );
};

export default ExpHeadline;
