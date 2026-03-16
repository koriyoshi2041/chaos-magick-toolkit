// Gnostic Pentagram Ritual (GPR) — Peter Carroll's banishing ritual
// The Chaos Magick equivalent of the LBRP

import type { RitualStep, RitualTemplate } from '../types.js'

const GPR_STEPS: readonly RitualStep[] = [
  {
    order: 1,
    name: 'Preparation',
    description: 'Stand facing any direction. Relax completely.',
    durationSeconds: 30,
    instruction: 'Stand in the center of your space. Breathe deeply. Relax every muscle. Clear your mind of all thoughts.',
  },
  // Phase 1: Five Vowel Vibrations (descending through the body)
  {
    order: 2,
    name: 'Vibrate I — Crown',
    description: 'Vibrate "I" (high-pitched "ieeeee"), visualizing radiance at the crown of the head.',
    durationSeconds: 20,
    instruction: 'Inhale deeply. Exhale slowly while sustaining the sound "IIIIII" (a high-pitched "ieeeee"). Visualize a sphere of brilliant radiance at the crown of your head. Feel the vibration there.',
  },
  {
    order: 3,
    name: 'Vibrate E — Throat',
    description: 'Vibrate "E" (a lower "eeeeh"), visualizing radiance at the throat.',
    durationSeconds: 20,
    instruction: 'Inhale deeply. Exhale slowly while sustaining the sound "EEEEE" (a lower "eeeeh"). Visualize radiance at the throat. Feel it resonate in the neck and jaw.',
  },
  {
    order: 4,
    name: 'Vibrate A — Heart',
    description: 'Vibrate "A" (deep "aaaah"), visualizing radiance at the heart and lungs.',
    durationSeconds: 20,
    instruction: 'Inhale deeply. Exhale slowly while sustaining the sound "AAAAA" (a deep "aaaah"). Visualize radiance at the heart, spreading through the lungs and into the muscles of the limbs.',
  },
  {
    order: 5,
    name: 'Vibrate O — Belly',
    description: 'Vibrate "O" ("ooooh"), visualizing radiance at the belly.',
    durationSeconds: 20,
    instruction: 'Inhale deeply. Exhale slowly while sustaining the sound "OOOOO" ("ooooh"). Visualize radiance at the solar plexus and belly. Feel warmth gathering there.',
  },
  {
    order: 6,
    name: 'Vibrate U — Base',
    description: 'Vibrate "U" (very deep "uuuur"), visualizing radiance at the base of the body.',
    durationSeconds: 20,
    instruction: 'Inhale deeply. Exhale slowly while sustaining the very deep sound "UUUUU" ("uuuur"). Visualize radiance at the genital and anal region. The body is now a five-pointed star of light.',
  },
  // Phase 2: Drawing Pentagrams at the Quarters
  {
    order: 7,
    name: 'Trace Pentagram — First Quarter',
    description: 'Draw a banishing pentagram while vibrating all five vowels.',
    durationSeconds: 30,
    instruction: 'With extended left arm, trace a large banishing pentagram in the air before you. As you draw, vibrate "I-E-A-O-U" in a continuous sequence. Visualize the pentagram blazing with energy.',
  },
  {
    order: 8,
    name: 'Turn — Second Quarter',
    description: 'Make an anti-clockwise quarter turn and trace another pentagram.',
    durationSeconds: 30,
    instruction: 'Turn anti-clockwise 90 degrees. Trace another banishing pentagram while vibrating "I-E-A-O-U". Visualize it blazing at this quarter.',
  },
  {
    order: 9,
    name: 'Turn — Third Quarter',
    description: 'Make another anti-clockwise quarter turn and trace a pentagram.',
    durationSeconds: 30,
    instruction: 'Turn anti-clockwise 90 degrees again. Trace another banishing pentagram while vibrating "I-E-A-O-U". Visualize it blazing at this quarter.',
  },
  {
    order: 10,
    name: 'Turn — Fourth Quarter',
    description: 'Make a final anti-clockwise quarter turn, completing the circle.',
    durationSeconds: 30,
    instruction: 'Turn anti-clockwise 90 degrees. Trace the final banishing pentagram while vibrating "I-E-A-O-U". You now face your original direction. Four blazing pentagrams surround you.',
  },
  // Phase 3: Closing — Reverse Vowel Vibrations (ascending through the body)
  {
    order: 11,
    name: 'Close: Vibrate U — Base',
    description: 'Repeat the vibrations in reverse, beginning with U.',
    durationSeconds: 15,
    instruction: 'Exhale slowly sustaining "UUUUU". Visualize the radiance at the base of the body.',
  },
  {
    order: 12,
    name: 'Close: Vibrate O — Belly',
    description: 'Vibrate O, ascending through the body.',
    durationSeconds: 15,
    instruction: 'Exhale slowly sustaining "OOOOO". Visualize the radiance at the belly.',
  },
  {
    order: 13,
    name: 'Close: Vibrate A — Heart',
    description: 'Vibrate A at the heart center.',
    durationSeconds: 15,
    instruction: 'Exhale slowly sustaining "AAAAA". Visualize the radiance at the heart.',
  },
  {
    order: 14,
    name: 'Close: Vibrate E — Throat',
    description: 'Vibrate E at the throat.',
    durationSeconds: 15,
    instruction: 'Exhale slowly sustaining "EEEEE". Visualize the radiance at the throat.',
  },
  {
    order: 15,
    name: 'Close: Vibrate I — Crown',
    description: 'Vibrate I at the crown. The ritual is complete.',
    durationSeconds: 15,
    instruction: 'Exhale slowly sustaining "IIIIII". Visualize the radiance at the crown. The space is purified. The banishing is complete.',
  },
]

export const GNOSTIC_PENTAGRAM_RITUAL: RitualTemplate = {
  id: 'gpr',
  name: 'Gnostic Pentagram Ritual',
  purpose: 'Banishing and purification of the ritual space. The primary banishing ritual of Chaos Magick.',
  steps: GPR_STEPS,
  banishingBefore: false,
  banishingAfter: false,
  colorAssociation: 'octarine',
}

export const SIGIL_CHARGING_RITUAL: RitualTemplate = {
  id: 'sigil-charge',
  name: 'Sigil Charging Ritual',
  purpose: 'A complete ceremony for charging a prepared sigil.',
  steps: [
    {
      order: 1,
      name: 'Banish',
      description: 'Perform a banishing ritual to clear the space.',
      durationSeconds: null,
      instruction: 'Perform the Gnostic Pentagram Ritual or your preferred banishing to purify the working space.',
    },
    {
      order: 2,
      name: 'Statement of Intent',
      description: 'Declare your intent clearly.',
      durationSeconds: 30,
      instruction: 'Hold the sigil before you. State your intent clearly one final time. After this, you will not think of the intent — only the sigil.',
    },
    {
      order: 3,
      name: 'Achieve Gnosis',
      description: 'Enter a gnostic state using your preferred method.',
      durationSeconds: null,
      instruction: 'Enter gnosis using your chosen method. Focus entirely on the sigil. Let the symbol burn into your mind. Nothing else exists.',
    },
    {
      order: 4,
      name: 'Fire the Sigil',
      description: 'At the peak of gnosis, release the sigil.',
      durationSeconds: 15,
      instruction: 'At the peak of gnosis — FIRE the sigil. Shout, laugh, or release with a sharp exhale. The sigil is launched into the void.',
    },
    {
      order: 5,
      name: 'Banish with Laughter',
      description: 'Laugh to break the ritual headspace.',
      durationSeconds: 30,
      instruction: 'LAUGH. Genuine, full laughter. This breaks the ritual consciousness and begins the forgetting process.',
    },
    {
      order: 6,
      name: 'Forget',
      description: 'Destroy the sigil and forget your intent.',
      durationSeconds: null,
      instruction: 'Destroy the physical sigil (burn, tear, delete). Immediately occupy yourself with something completely unrelated. Do not think about the working.',
    },
  ],
  banishingBefore: true,
  banishingAfter: true,
  colorAssociation: 'octarine',
}

export const SERVITOR_CREATION_RITUAL: RitualTemplate = {
  id: 'servitor-create',
  name: 'Servitor Creation Ceremony',
  purpose: 'A full ritual for giving life to a servitor entity.',
  steps: [
    {
      order: 1,
      name: 'Prepare the Space',
      description: 'Banish and set up the working area.',
      durationSeconds: null,
      instruction: 'Banish the space. Place the servitor\'s sigil in the center of your working area. Have all servitor details written down.',
    },
    {
      order: 2,
      name: 'Declare the Name',
      description: 'Speak the servitor\'s name aloud for the first time.',
      durationSeconds: 30,
      instruction: 'Speak the servitor\'s name aloud three times. With each repetition, visualize it more clearly. Feel it becoming real.',
    },
    {
      order: 3,
      name: 'Define the Purpose',
      description: 'State the servitor\'s task clearly.',
      durationSeconds: 30,
      instruction: 'State the servitor\'s purpose aloud: "Your purpose is [purpose]. You exist to serve this function and no other."',
    },
    {
      order: 4,
      name: 'Breathe Life',
      description: 'Enter gnosis and channel energy into the servitor.',
      durationSeconds: null,
      instruction: 'Enter gnosis. Visualize the servitor taking form. Breathe energy into its sigil. Feel it quicken with independent existence.',
    },
    {
      order: 5,
      name: 'Set Boundaries',
      description: 'Define the servitor\'s limits and dissolution conditions.',
      durationSeconds: 30,
      instruction: 'State aloud: "Your activation trigger is [trigger]. You will be fed by [method]. When [condition], you will dissolve and return to the void."',
    },
    {
      order: 6,
      name: 'First Feeding',
      description: 'Give the servitor its first feeding of energy.',
      durationSeconds: 60,
      instruction: 'Feed the servitor for the first time using the chosen method. Visualize it growing stronger. It is alive.',
    },
    {
      order: 7,
      name: 'Seal and Release',
      description: 'Seal the working and release the servitor.',
      durationSeconds: 30,
      instruction: 'Speak: "[Name], go forth and fulfill your purpose." Banish to seal the working. The servitor is now active.',
    },
  ],
  banishingBefore: true,
  banishingAfter: true,
  colorAssociation: 'purple',
}

export const INVOCATION_RITUAL: RitualTemplate = {
  id: 'invocation',
  name: 'God-Form Invocation',
  purpose: 'Invoke a deity, archetype, or fictional character to channel their qualities. Paradigm-agnostic.',
  steps: [
    {
      order: 1,
      name: 'Banish',
      description: 'Clear the space of all prior influences.',
      durationSeconds: null,
      instruction: 'Perform the GPR or your preferred banishing. The space must be clean before you invite an entity in.',
    },
    {
      order: 2,
      name: 'Research & Preparation',
      description: 'Know the entity you are invoking.',
      durationSeconds: null,
      instruction: 'Review the attributes, symbols, colors, and myths of the entity. Place any associated objects or images before you. The more detail you hold, the stronger the invocation.',
    },
    {
      order: 3,
      name: 'Assumption of the Form',
      description: 'Begin to take on the posture and bearing of the entity.',
      durationSeconds: 60,
      instruction: 'Stand as the entity stands. Breathe as it breathes. Adopt its posture, its facial expression, its stance. Feel your body becoming a vessel.',
    },
    {
      order: 4,
      name: 'The Invocation',
      description: 'Call the entity into yourself.',
      durationSeconds: null,
      instruction: 'Speak aloud: "I am [Name]. I call [Name] into this vessel. Let [Name]\'s qualities flow through me." Repeat with increasing intensity until you feel the shift. You are no longer pretending — you ARE the entity.',
    },
    {
      order: 5,
      name: 'Communion',
      description: 'Dwell in the invoked state. Ask questions. Receive insight.',
      durationSeconds: null,
      instruction: 'Remain in the god-form. Speak as the entity. Move as the entity. If you have questions, ask them now and listen for answers that arise from within. Record any insights.',
    },
    {
      order: 6,
      name: 'Devocation',
      description: 'Release the entity and return to yourself.',
      durationSeconds: 30,
      instruction: 'Speak: "I thank [Name] for this communion. I release [Name] from this vessel. I am [your own name]." Shake your body. Stamp your feet. Return fully to yourself.',
    },
    {
      order: 7,
      name: 'Banish Again',
      description: 'Seal the working and ensure clean separation.',
      durationSeconds: null,
      instruction: 'Perform the GPR again. This is essential — never leave an invocation without banishing. Eat something grounding afterward.',
    },
  ],
  banishingBefore: true,
  banishingAfter: true,
  colorAssociation: 'octarine',
}

export const GNOSTIC_THUNDERBOLT_RITUAL: RitualTemplate = {
  id: 'gnostic-thunderbolt',
  name: 'The Gnostic Thunderbolt',
  purpose: 'A rapid-fire banishing and energizing technique. Used for quick cleansing, energy raising, or as an emergency banishing.',
  steps: [
    {
      order: 1,
      name: 'Ground',
      description: 'Stand firmly. Feel gravity anchor you.',
      durationSeconds: 10,
      instruction: 'Stand with feet shoulder-width apart. Feel the weight of your body pressing into the earth. You are immovable.',
    },
    {
      order: 2,
      name: 'Inhale Power',
      description: 'Draw energy from all directions into your center.',
      durationSeconds: 10,
      instruction: 'Inhale sharply and deeply. As you inhale, visualize energy rushing in from all directions — above, below, and every side — converging at your solar plexus.',
    },
    {
      order: 3,
      name: 'Hold and Compress',
      description: 'Compress the gathered energy into a tight sphere.',
      durationSeconds: 5,
      instruction: 'Hold the breath. Feel the energy compress into a brilliant, dense sphere of light at your center. Tighter. Denser. More intense.',
    },
    {
      order: 4,
      name: 'Release the Thunderbolt',
      description: 'Explode the energy outward in all directions.',
      durationSeconds: 5,
      instruction: 'Exhale explosively with a sharp shout — "HA!" or "IAO!" — while throwing your arms outward. Visualize the compressed energy detonating outward as a shockwave of light, annihilating all unwanted influences.',
    },
    {
      order: 5,
      name: 'Stillness',
      description: 'Stand in the purified space.',
      durationSeconds: 10,
      instruction: 'Stand still. Feel the emptiness of the purified space around you. Nothing remains but your will.',
    },
  ],
  banishingBefore: false,
  banishingAfter: false,
  colorAssociation: 'octarine',
}

export const BUILTIN_RITUALS: readonly RitualTemplate[] = [
  GNOSTIC_PENTAGRAM_RITUAL,
  SIGIL_CHARGING_RITUAL,
  SERVITOR_CREATION_RITUAL,
  INVOCATION_RITUAL,
  GNOSTIC_THUNDERBOLT_RITUAL,
]
