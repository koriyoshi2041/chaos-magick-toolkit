// Gnosis technique catalog
// Two categories: Inhibitory (stillness) and Excitatory (arousal)

import type { GnosisTechnique, GnosisType } from '../types.js'

export interface GnosisMethodInfo {
  readonly technique: GnosisTechnique
  readonly type: GnosisType
  readonly name: string
  readonly description: string
  readonly instructions: readonly string[]
  readonly defaultDurationMinutes: number
}

export const GNOSIS_METHODS: readonly GnosisMethodInfo[] = [
  // Inhibitory techniques — achieving gnosis through stillness
  {
    technique: 'meditation',
    type: 'inhibitory',
    name: 'Meditation',
    description: 'Still the mind completely. Focus on nothing.',
    instructions: [
      'Sit comfortably with spine straight.',
      'Close your eyes and relax your body.',
      'Let thoughts arise and pass without engagement.',
      'Sink deeper into mental silence.',
      'When the mind is truly empty, the gateway opens.',
    ],
    defaultDurationMinutes: 15,
  },
  {
    technique: 'gazing',
    type: 'inhibitory',
    name: 'Point Gazing',
    description: 'Fix your gaze on a single point until vision dissolves.',
    instructions: [
      'Choose a fixation point — a dot, flame, or sigil.',
      'Gaze without blinking for as long as possible.',
      'Allow peripheral vision to dissolve.',
      'Colors may shift, shapes may warp — this is normal.',
      'Hold the altered state. The veil thins here.',
    ],
    defaultDurationMinutes: 10,
  },
  {
    technique: 'breathing',
    type: 'inhibitory',
    name: 'Breath Control',
    description: 'Rhythmic breathing to shift consciousness.',
    instructions: [
      'Follow the guided breath pattern.',
      'Inhale deeply through the nose.',
      'Hold at the peak — feel the stillness.',
      'Exhale slowly and completely.',
      'Let the rhythm carry you beyond ordinary awareness.',
    ],
    defaultDurationMinutes: 10,
  },
  {
    technique: 'mantra',
    type: 'inhibitory',
    name: 'Mantra Repetition',
    description: 'Repeat a word or phrase until meaning dissolves.',
    instructions: [
      'Choose or create a mantra — it need not have meaning.',
      'Repeat it aloud, then softly, then silently.',
      'Let the sound fill your entire awareness.',
      'When the word loses meaning, gnosis approaches.',
      'The gap between repetitions is where power lives.',
    ],
    defaultDurationMinutes: 15,
  },
  {
    technique: 'sensory_deprivation',
    type: 'inhibitory',
    name: 'Sensory Deprivation',
    description: 'Reduce all sensory input to reach the void state.',
    instructions: [
      'Find a completely dark, quiet space.',
      'Use earplugs or noise-cancelling if available.',
      'Lie still. Do not move.',
      'Let proprioception fade.',
      'In the absence of sensation, consciousness expands.',
    ],
    defaultDurationMinutes: 20,
  },
  {
    technique: 'neither_neither',
    type: 'inhibitory',
    name: "Spare's Neither-Neither",
    description: "Hold two contradictory thoughts until the mind short-circuits into vacuity.",
    instructions: [
      'Choose two opposing statements about your intent.',
      'Example: "I desire X" and "I do not desire X."',
      'Hold both as simultaneously true in your mind.',
      'Do not resolve the contradiction — sustain it.',
      'The mind, unable to hold both, collapses into vacuity.',
      'In that moment of blankness, the gateway opens.',
      'This is Spare\'s most potent technique — the Void via paradox.',
    ],
    defaultDurationMinutes: 15,
  },
  {
    technique: 'death_posture',
    type: 'inhibitory',
    name: "Spare's Death Posture",
    description: 'Assume a posture of extreme tension until the body collapses into vacuity.',
    instructions: [
      'Stand on tiptoes with arms stretched above, fingers interlocked.',
      'Tense every muscle in the body simultaneously.',
      'Stare fixedly ahead. Do not blink.',
      'Hold the posture beyond the point of trembling.',
      'When the body can no longer sustain the tension, collapse.',
      'In the moment of release, the mind empties completely.',
      'This is the Death Posture — Spare considered it the supreme gnosis technique.',
      'Practice safely. Have a soft surface beneath you.',
    ],
    defaultDurationMinutes: 5,
  },
  // Excitatory techniques — achieving gnosis through overload
  {
    technique: 'dancing',
    type: 'excitatory',
    name: 'Ecstatic Dance',
    description: 'Dance with abandon until the ego dissolves.',
    instructions: [
      'Put on driving, rhythmic music.',
      'Begin moving — do not plan your movements.',
      'Let the body move of its own accord.',
      'Push past exhaustion into a second wind.',
      'When you are no longer the dancer, gnosis is achieved.',
    ],
    defaultDurationMinutes: 20,
  },
  {
    technique: 'drumming',
    type: 'excitatory',
    name: 'Rhythmic Drumming',
    description: 'Follow a driving beat to shift consciousness.',
    instructions: [
      'Follow the metronome beat.',
      'Drum, clap, or tap along with full focus.',
      'Let the rhythm become your entire world.',
      'Increase intensity gradually.',
      'The trance state opens when rhythm becomes automatic.',
    ],
    defaultDurationMinutes: 15,
  },
  {
    technique: 'chanting',
    type: 'excitatory',
    name: 'Vowel Chanting',
    description: 'Vibrate vowel sounds to alter consciousness.',
    instructions: [
      'Stand with feet shoulder-width apart.',
      'Take a deep breath.',
      'Vibrate each vowel from deep in the chest:',
      'IIIIII — EEEEE — AAAAA — OOOOO — UUUUU',
      'Feel each vowel resonate in different body centers.',
    ],
    defaultDurationMinutes: 10,
  },
  {
    technique: 'pain',
    type: 'excitatory',
    name: 'Ordeal',
    description: 'Use controlled physical intensity to break through.',
    instructions: [
      'WARNING: Practice safely. Know your limits.',
      'Cold exposure, intense exercise, or sustained posture.',
      'Hold an uncomfortable position until the mind breaks free.',
      'The body screams — but beyond it lies the void.',
      'Use a timer. Safety is paramount.',
    ],
    defaultDurationMinutes: 10,
  },
  {
    technique: 'emotional_arousal',
    type: 'excitatory',
    name: 'Emotional Peak',
    description: 'Channel extreme emotion as a gateway to gnosis.',
    instructions: [
      'SAFETY: This technique works with intense emotions. If you have trauma-related conditions, proceed with care or choose another method.',
      'Invoke a powerful memory or visualization.',
      'Let the emotion build without restraint.',
      'Fear, ecstasy, rage, grief — any extreme will serve.',
      'At the peak of intensity, direct the energy toward the sigil or intent.',
      'This is the moment of maximum magical power.',
      'Afterwards, ground yourself. Breathe slowly and return to baseline.',
    ],
    defaultDurationMinutes: 10,
  },
  {
    technique: 'overbreathing',
    type: 'excitatory',
    name: 'Overbreathing (Hyperventilation)',
    description: 'Rapid deep breathing to flood the body with oxygen and shift consciousness.',
    instructions: [
      'SAFETY: Stop immediately if you feel pain, extreme dizziness, or panic. Do not practice near water or heights.',
      'Sit or lie down in a safe, comfortable position.',
      'Breathe rapidly and deeply — in through the mouth, out through the mouth.',
      'Maintain a fast, forceful rhythm without pausing.',
      'Tingling, lightheadedness, and visual distortion are normal.',
      'After 2-3 minutes of overbreathing, take one final deep breath and HOLD.',
      'In the breath-hold, focus entirely on the sigil or intent.',
      'The oxygen-saturated state produces a powerful altered consciousness.',
      'Resume normal breathing gently. Ground yourself before standing.',
    ],
    defaultDurationMinutes: 5,
  },
  {
    technique: 'sexual',
    type: 'excitatory',
    name: 'Sexual Gnosis',
    description: 'Channel sexual energy to the peak of arousal as a gateway to gnosis.',
    instructions: [
      'This is one of the oldest and most powerful gnosis techniques.',
      'Build sexual arousal through whatever means you prefer.',
      'At the point of no return, focus entirely on the sigil or intent.',
      'At the moment of climax, the conscious mind shatters — fire the sigil.',
      'The orgasm is the moment of gnosis. All awareness must be on the symbol.',
      'Afterwards, banish with laughter and do not dwell on the working.',
      'Solo practice is traditional, but partnered work is equally valid.',
    ],
    defaultDurationMinutes: 15,
  },
]
