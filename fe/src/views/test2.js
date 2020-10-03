const {
  React: { useState, useRef, useEffect, Fragment },
  ReactDOM: { render },
  gsap: {
    set,
    to,
    timeline,
    utils: { random },
  },
} = window
const rootNode = document.getElementById('app')
const armLimit = random(0, 3)
const headLimit = random(armLimit + 1, armLimit + 3)
const angerLimit = random(headLimit + 1, headLimit + 3)
const armDuration = 0.2
const bearDuration = 0.25
const checkboxDuration = 0.25
const pawDuration = 0.1

const SOUNDS = {
  ON: new Audio('https://assets.codepen.io/605876/switch-on.mp3'),
  OFF: new Audio('https://assets.codepen.io/605876/switch-off.mp3'),
  GROAN: new Audio('https://assets.codepen.io/605876/bear-groan.mp3'),
}
SOUNDS.GROAN.playbackRate = 2

const App = () => {
  const [checked, setChecked] = useState(false)
  const [count, setCount] = useState(1)
  const bearRef = useRef(null)
  const swearRef = useRef(null)
  const armWrapRef = useRef(null)
  const pawRef = useRef(null)
  const armRef = useRef(null)
  const bgRef = useRef(null)
  const indicatorRef = useRef(null)

  const onHover = () => {
    if (Math.random() > 0.5 && count > armLimit) {
      to(bearRef.current, bearDuration / 2, { y: '40%' })
    }
  }
  const offHover = () => {
    if (!checked) {
      to(bearRef.current, bearDuration / 2, { y: '100%' })
    }
  }
  const onChange = () => {
    if (checked) return
    setChecked(true)
  }

  useEffect(() => {
    const grabBearTL = () => {
      /**
       * Different height translations for the bear elements
       *
       * Paw will go to scaleX 0.8
       * Arm scaleX goes down to 0.7
       * Arm wrap translates to 50% or 50px
       * Bear goes 100% -> 40% -> 0
       */
      let bearTranslation
      if (count > armLimit && count < headLimit) {
        bearTranslation = '40%'
      } else if (count >= headLimit) {
        bearTranslation = '0%'
      }
      const onComplete = () => {
        setChecked(false)
        setCount(count + 1)
      }
      let onBearComplete = () => {}
      if (Math.random() > 0.5 && count > angerLimit)
        onBearComplete = () => {
          SOUNDS.GROAN.play()
          set(swearRef.current, { display: 'block' })
        }
      const base = armDuration + armDuration + pawDuration
      const preDelay = Math.random()
      const delay = count > armLimit ? base + bearDuration + preDelay : base
      const bearTL = timeline({ delay: Math.random(), onComplete })
      bearTL
        .add(
          count > armLimit
            ? to(bearRef.current, {
                duration: bearDuration,
                onComplete: onBearComplete,
                y: bearTranslation,
              })
            : () => {}
        )
        .to(
          armWrapRef.current,
          { x: 50, duration: armDuration },
          count > armLimit ? preDelay : 0
        )
        .to(armRef.current, { scaleX: 0.7, duration: armDuration })
        .to(pawRef.current, {
          duration: pawDuration,
          scaleX: 0.8,
          onComplete: () => set(swearRef.current, { display: 'none' }),
        })
        .to(
          bgRef.current,
          {
            onStart: () => {
              SOUNDS.OFF.play()
            },
            duration: checkboxDuration,
            backgroundColor: '#aaa',
          },
          delay
        )
        .to(
          indicatorRef.current,
          { duration: checkboxDuration, x: '0%' },
          delay
        )
        .to(pawRef.current, { duration: pawDuration, scaleX: 0 }, delay)
        .to(
          armRef.current,
          { duration: pawDuration, scaleX: 1 },
          delay + pawDuration
        )
        .to(
          armWrapRef.current,
          { duration: armDuration, x: 0 },
          delay + pawDuration
        )
        .to(
          bearRef.current,
          { duration: bearDuration, y: '100%' },
          delay + pawDuration
        )
      return bearTL
    }
    const showTimeline = () => {
      timeline({
        onStart: () => SOUNDS.ON.play(),
      })
        .to(
          bgRef.current,
          { duration: checkboxDuration, backgroundColor: '#2eec71' },
          0
        )
        .to(indicatorRef.current, { duration: checkboxDuration, x: '100%' }, 0)
        .add(grabBearTL(), checkboxDuration)
    }
    if (checked) showTimeline()
  }, [checked, count])