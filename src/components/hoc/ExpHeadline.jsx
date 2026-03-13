import React, { useEffect, useRef, useState } from 'react';

const ExpHeadline = ({
  phrases = ['Work Experience', 'I Have Worked At', 'Professional Journey'],
  typeSpeed = 65,
  deleteSpeed = 40,
  stay = 1200,
  pauseBeforeType = 350,

  fontMin = '1.4rem',
  fontVW = '7vw',
  fontMax = '3rem',

  textBackground = '',
  underline = true,
}) => {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef();

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  const textBgStyle = (() => {
    const isUrl =
      typeof textBackground === 'string' &&
      (textBackground.startsWith('url(') ||
        textBackground.startsWith('http') ||
        textBackground.startsWith('/'));

    const backgroundImage = isUrl
      ? (textBackground.startsWith('url(') ? textBackground : `url("${textBackground}")`)
      : '';

    return backgroundImage
      ? {
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }
      : {
        backgroundImage: 'linear-gradient(90deg, #2563eb, #0ea5e9)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      };
  })();

  useEffect(() => {
    if (reduced) {
      setText(phrases[0] || '');
      return;
    }
    const current = phrases[i] || '';
    const isDoneTyping = text === current;
    const isDoneDeleting = deleting && text === '';

    let delay = typeSpeed;

    if (!deleting && !isDoneTyping) {
      delay = typeSpeed;
      timerRef.current = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
      }, delay);
    } else if (!deleting && isDoneTyping) {
      delay = stay;
      timerRef.current = setTimeout(() => setDeleting(true), delay);
    } else if (deleting && !isDoneDeleting) {
      delay = deleteSpeed;
      timerRef.current = setTimeout(() => {
        setText(current.slice(0, text.length - 1));
      }, delay);
    } else if (isDoneDeleting) {
      delay = pauseBeforeType;
      timerRef.current = setTimeout(() => {
        setI((p) => (p + 1) % phrases.length);
        setDeleting(false);
      }, delay);
    }

    return () => clearTimeout(timerRef.current);
  }, [text, deleting, i, phrases, typeSpeed, deleteSpeed, stay, pauseBeforeType, reduced]);

  return (
    <>
      <style>{`
        .exp-headline {
          font-weight: 900;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          line-height: 1.15;
          display: block;
          position: relative;
          max-width: 100%;
          overflow-wrap: anywhere;
          word-break: break-word;
          margin: 0; /* Ensure no browser default margin adds space */
        }
        .exp-text {
          display: inline;
          white-space: normal;
        }
        .caret {
          display: inline-block;
          width: 0.08em;
          margin-left: 2px;
          background: currentColor;
          animation: blink 1s steps(1) infinite;
          vertical-align: baseline;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .exp-underline {
          display: block;
          height: 3px;
          width: 100%;
          margin-top: 8px;
          background: linear-gradient(90deg, #2563eb, #0ea5e9);
          border-radius: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .caret { display: none; }
        }
      `}</style>

      <div className="exp-wrap">
        <h2
          className="exp-headline"
          aria-live="polite"
          style={{
            fontSize: `clamp(${fontMin}, ${fontVW}, ${fontMax})`,
          }}
        >
          <span className="exp-text" style={textBgStyle}>{text}</span>
          <span className="caret" />
        </h2>

        {underline && <span className="exp-underline" />}
      </div>
    </>
  );
};

export default ExpHeadline;
