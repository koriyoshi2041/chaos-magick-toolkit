```
                    \       |       /
                     \      |      /
                      \     |     /
               -------  ◉  -------
                      /     |     \
                     /      |      \
                    /       |       \

             C H A O S    M A G I C K
                 Practice Toolkit
```

<div align="center">

> *"Nothing is true, everything is permitted."*
>
> -- Hassan-i Sabbah, via William S. Burroughs, via the Current

---

**A grimoire in code. A temple in the terminal.**
**Forged by practitioners. For practitioners.**

---

</div>

## The Grimoire Speaks

This is not software. This is a working instrument.

**CHAOS MAGICK** is a command-line toolkit for the practice of Chaos Magick -- the art of using belief as a tool rather than an end. It implements the core disciplines of the tradition with technical precision and philosophical integrity: sigil creation following Austin Osman Spare's method, gnosis induction across twelve techniques catalogued by Peter Carroll, servitor lifecycle management, divination through the eight-rayed star, ritual construction with the Gnostic Pentagram Ritual at its heart, and a magickal diary that tracks practice against the lunar cycle.

Every operation uses cryptographic randomness drawn from the OS entropy pool. No pseudo-random shortcuts. When the oracle speaks, it speaks from genuine chaos.

> *"Belief is a tool."*
>
> -- Peter J. Carroll, *Liber Null*

The tool does not tell you what to believe. It gives you the machinery to work with whatever paradigm you choose to inhabit -- and to shed it when the work is done.

---

## The Eight-fold Path

### ⛧ Sigil Forge -- The Art of Desire Made Symbol

> *"The magician must decide exactly what they want, find the appropriate symbolism, and fire it into the subconscious."*
>
> -- Austin Osman Spare

Desire enters as language. It leaves as glyph. The Forge implements three methods of sigilization:

**Spare's Classic Method** -- The original technique. Your statement of intent is stripped of vowels, deduplicated to its consonant skeleton, and the remaining letters overlaid into a single composite glyph on a 13x13 grid. The result is a visual sigil unique to your desire, rendered in Unicode line-drawing characters.

**The Witch's Sigil Wheel** -- Three concentric rings carrying the twenty-six letters. Your intent's letters are located on the wheel and connected by lines traced across the rings. The path through the circles *is* the sigil. Start and end points are marked for directional charging.

**Kamea of Saturn** -- The 3x3 magic square (2-7-6 / 9-5-1 / 4-3-8). Each letter maps to a number, each number to a position on the grid. The sigil is the path your intent traces through Saturn's square -- the planet of structure, limitation, and will made manifest.

After creation, the Forge offers a **destruction sequence**: the sigil dissolves through progressive noise into blankness. *Do not lust for results.*

```
npm run sigil
```

---

### ◉ Gnosis Engine -- The Gateway of No-Mind

> *"Chaoist practice begins with the mastery of gnosis."*
>
> -- Peter J. Carroll

Gnosis is the altered state of consciousness in which magic operates. The Engine provides guided sessions across fourteen techniques in two categories:

**Inhibitory** (gnosis through stillness):
| Technique | Gateway |
|-----------|---------|
| Meditation | Empty the mind completely |
| Point Gazing | Fix the gaze until vision dissolves |
| Breath Control | Guided rhythmic breathing (4-4-6, 4-7-8, 6-6-6 patterns) |
| Mantra Repetition | Repeat until meaning collapses |
| Sensory Deprivation | Cut all input; consciousness expands |
| Spare's Neither-Neither | Hold two contradictions until the mind short-circuits |
| Spare's Death Posture | Extreme tension until the body collapses into vacuity |

**Excitatory** (gnosis through overload):
| Technique | Gateway |
|-----------|---------|
| Ecstatic Dance | Move until the ego dissolves |
| Rhythmic Drumming | Follow the beat into trance (metronome provided) |
| Vowel Chanting | Vibrate I-E-A-O-U through the body centers |
| Ordeal | Controlled intensity breaks the mind free |
| Emotional Peak | Channel extreme emotion as a gateway |
| Sexual Gnosis | The oldest technique; climax shatters the conscious mind |
| Overbreathing | Rapid deep breathing floods the body with oxygen; gnosis in the breath-hold |

The Engine provides real-time timers, breath pattern guides, and drumming metronomes. It does not simulate gnosis. It gives you the framework. You provide the fire.

```
npm run gnosis
```

---

### ⊕ Servitor Lab -- The Creation of Living Thought

> *"Sigils work because they allow the conscious mind to communicate directly with the subconscious."*
>
> -- Grant Morrison

A servitor is a thought-form given independent existence and purpose. The Lab manages the complete lifecycle:

1. **Creation** -- Name, purpose, appearance, housing, activation trigger, feeding method, dissolution conditions. A sigil is generated automatically. A creation ritual guides the birth.
2. **Feeding** -- Servitors require regular energy. The Lab tracks feeding schedules (daily, weekly, monthly) and alerts when a servitor is overdue.
3. **Activation / Dormancy** -- Toggle a servitor between active duty and sleep.
4. **Dissolution** -- When the task is complete or the servitor is no longer needed, dissolve it cleanly. All activity is logged.

Names are procedurally generated from barbarous syllables (*Zargoth, Kharisel, Nexvoon*) or you may name them yourself. Every action is recorded in the servitor's activity log.

Data persists to `~/.chaos-magick/servitors.json`. Your servitors survive between sessions.

```
npm run servitor
```

---

### ✦ Chaos Oracle -- The Voice of the Void

> *"Results are the only measure of magical practice."*
>
> -- Peter J. Carroll, *Liber Kaos*

Four divination methods, each drawing from cryptographic randomness:

**Chaos Star Reading** -- The eight-pointed star spins and selects a direction. Each of the eight arrows corresponds to one of Carroll's Eight Colors of Magic (Octarine, Black, Blue, Green, Yellow, Purple, Orange, Red) and its associated domain. The arrow that falls is the oracle's answer.

**Eight Colors Reading** -- Two colors are drawn: Primary (the situation) and Secondary (the action). The 8x8 matrix of combinations yields 64 unique readings -- each a specific instruction for applying one type of magical force to another type of situation.

**Binary Oracle** -- Eight bits drawn from the void form a byte. The binary pattern is interpreted through a sixteen-fold system of oracular utterances, from "The void speaks silence. Wait." to "Completion. The circle closes."

**Bibliomancy** -- The text opens at random. Your finger falls upon a passage from the collected words of Spare, Carroll, Hine, Crowley, Morrison, and Wilson. Meditate on how it speaks to your question.

```
npm run oracle
```

---

### ⍟ Ritual Architect -- The Theatre of Will

> *"Magic is the science and art of causing change to occur in conformity with will."*
>
> -- Aleister Crowley

Five built-in ritual templates, plus the ability to construct your own:

**The Gnostic Pentagram Ritual (GPR)** -- The primary banishing ritual of Chaos Magick, Carroll's answer to the Lesser Banishing Ritual of the Pentagram. Ten steps: preparation, the threefold vibration of IAO, four directional pentagrams, completion of the circle, and the sealing vibration. The Architect provides step-by-step guidance with timing.

**Sigil Charging Ceremony** -- A complete ritual for charging a prepared sigil: banish, state intent, achieve gnosis, fire the sigil, banish with laughter, forget.

**Servitor Creation Ceremony** -- The full rite for bringing a servitor to life: prepare the space, declare the name, define the purpose, breathe life through gnosis, set boundaries, give the first feeding, seal and release.

**Invocation Ritual (God-Form)** -- Assume the mask of a god, archetype, or egregore. Enter gnosis, invoke the form, channel its qualities, work with its force, then remove the mask and banish.

**Gnostic Thunderbolt** -- A rapid-fire banishing for when the full GPR is too much. Three sharp exhalations, three stamps, and the space is cleared in seconds.

**Custom Rituals** -- Build your own step-by-step ritual templates. Specify name, purpose, steps with instructions and optional timing, and whether to include banishing before and after. Custom rituals persist to disk and appear alongside the built-ins.

```
npm run ritual
```

---

### ▓ Black Book -- The Mirror of the Work

> *"Do not lust for results."*
>
> -- Austin Osman Spare

The magickal diary -- the single most important tool in any practitioner's arsenal. Carroll insists on it. Hine insists on it. Every serious tradition insists on it. The Black Book implements it:

Each entry records:
- **Body state** and **mental state** at time of practice
- **Technique** used and **symbols** encountered
- **Intent** of the working and **result** observed
- **Dreams** following the working
- **Notes** and **tags** for cross-referencing
- **Moon phase** (automatically calculated from synodic period)
- **Carroll's Magic Equation**: M = G x L x (1-A) x (1-R) -- Gnosis, Link, Awareness, Resistance

The Book supports filtering by tag, date range, technique, or moon phase. Full-text search across all entries. Practice statistics: technique frequency, moon phase correlation, streak tracking.

Data persists to `~/.chaos-magick/diary.json`.

```
npm run diary
```

---

## The Rite of Installation

### I. Prepare the Ground

[Node.js](https://nodejs.org/) v18 or later must be present.

### II. Summon the Dependencies

```bash
cd chaos-magick
npm install
```

### III. Open the Gate

```bash
npm start
```

This opens the main menu. Select a module by number or name.

### IV. Direct Invocation

Each module can be summoned directly:

```bash
npm run sigil       # Sigil Forge
npm run gnosis      # Gnosis Engine
npm run servitor    # Servitor Lab
npm run oracle      # Chaos Oracle
npm run ritual      # Ritual Architect
npm run diary       # Black Book
```

---

## The Eight Colors

Carroll's model of eight types of magic, each corresponding to a direction on the Chaosphere:

| Color | Direction | Domain | Force |
|-------|-----------|--------|-------|
| **Octarine** | North | Pure Magic | The color of magic itself |
| **Black** | Northeast | Death Magic | Entropy, endings, transformation |
| **Blue** | East | Wealth Magic | Material abundance, prosperity |
| **Green** | Southeast | Love Magic | Attraction, connection, empathy |
| **Yellow** | South | Ego Magic | Self-transformation, identity |
| **Purple** | Southwest | Sex Magic | Creative force, passion, generation |
| **Orange** | West | Thinking Magic | Intellect, strategy, communication |
| **Red** | Northwest | War Magic | Conflict, competition, martial force |

---

## Architecture

```
src/
  types.ts                # The Covenant — all type definitions
  core/
    sigil.ts              # Sigil generation (Spare, Witch Circle, Saturn Kamea)
    gnosis.ts             # Gnosis timers (breath, drum, mantra, countdown)
    servitor.ts           # Servitor CRUD and lifecycle
    oracle.ts             # Four divination engines
    ritual.ts             # Ritual template management and execution
    diary.ts              # Magickal diary CRUD, filtering, statistics
    moon.ts               # Synodic moon phase calculation
    random.ts             # Cryptographic randomness (CSPRNG)
    storage.ts            # JSON file persistence (~/.chaos-magick/)
  data/
    quotes.ts             # Collected words of the practitioners
    gnosis-methods.ts     # Fourteen gnosis technique descriptions
    gpr.ts                # Built-in ritual templates (GPR, Sigil Charge, Servitor Creation, Invocation, Thunderbolt)
    colors.ts             # Carroll's Eight Colors of Magic
    symbols.ts            # Unicode occult symbols, Saturn square, box-drawing
  cli/
    main.ts               # Entry point and main menu
    sigil-flow.ts         # Sigil Forge interactive flow
    gnosis-flow.ts        # Gnosis Engine interactive flow
    servitor-flow.ts      # Servitor Lab interactive flow
    oracle-flow.ts        # Chaos Oracle interactive flow
    ritual-flow.ts        # Ritual Architect interactive flow
    diary-flow.ts         # Black Book interactive flow
```

All persistent data is stored in `~/.chaos-magick/` as JSON files.

---

## Lineage

This grimoire draws from the work and words of:

- **Austin Osman Spare** (1886--1956) -- Who invented the sigil method and the Neither-Neither technique. The grandfather of Chaos Magick before the name existed.
- **Peter J. Carroll** -- *Liber Null & Psychonaut*, *Liber Kaos*. Who systematized the practice, defined the Eight Colors, created the Gnostic Pentagram Ritual, formulated the magic equation, and insisted that results are the only measure.
- **Phil Hine** -- *Condensed Chaos*, *Prime Chaos*. Who made the practice accessible without diluting it. "Whatever works, use it."
- **Ray Sherwin** -- *The Book of Results*. Co-founder of the Illuminates of Thanateros with Carroll. Pioneered the pragmatic approach.
- **Grant Morrison** -- Who brought sigils to a wider audience and demonstrated that the technique works regardless of the practitioner's metaphysical framework.
- **Robert Anton Wilson** -- *Cosmic Trigger*, *Prometheus Rising*. Who taught that all models are tools and none are truths. "All phenomena are real in some sense, unreal in some sense..."
- **Aleister Crowley** -- Whose definition of magic as "causing change in conformity with will" remains the foundation, even as Chaos Magick discards most of his ceremonial apparatus.
- **Hassan-i Sabbah** -- To whom the fundamental axiom is attributed, whether or not he ever said it.

---

## The Law

This work is released under the [MIT License](LICENSE).

In the language of the tradition:

> This grimoire is open. Use it, modify it, distribute it, destroy it, rebuild it.
> There is no orthodoxy here. There is no authority. There are no guardians at the gate.
> If it works, use it. If it stops working, change it. If you find something better, share it.
>
> The only law is this: *results are the only measure.*

---

## A Final Word

> *"The Chaos Magician seeks to understand the nature of belief itself, rather than subscribing to any particular belief system."*
>
> -- Phil Hine

This tool does not require you to believe in magic. It does not require you to disbelieve. It requires you to *practice* -- to test, to record, to measure, to adjust. The Black Book is there for a reason. Use it.

The question is never "Is this real?" The question is "Does this work?"

---

<div align="center">

*For those who speak the tongue of the void:*

**[README.chaos.md](README.chaos.md)** -- *Liber Instrumentum Chaos*

---

```
        \       |       /
         \      |      /
          \     |     /
   -------  ◉  -------
          /     |     \
         /      |      \
        /       |       \
```

*The void reclaims its silence.*

</div>
