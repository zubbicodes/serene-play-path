import { createFileRoute } from "@tanstack/react-router";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  HelpCircle,
  MessageCircleQuestion,
  Puzzle,
  RotateCcw,
  Shuffle,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — MindQuest" },
      {
        name: "description",
        content: "Mental wellness mini-games that build emotional awareness through gentle play.",
      },
    ],
  }),
  component: LibraryPage,
});

type WordLevel = {
  word: string;
  letters: string[];
  hint: string;
};

const WORD_LEVELS: WordLevel[] = [
  {
    word: "CALM",
    letters: ["M", "C", "A", "L", "B", "E"],
    hint: "A steady feeling you can return to with slow breathing.",
  },
  {
    word: "REST",
    letters: ["T", "R", "S", "E", "A", "O"],
    hint: "Your mind and body need this to recover.",
  },
  {
    word: "HOPE",
    letters: ["P", "H", "E", "O", "L", "S"],
    hint: "The belief that things can get better.",
  },
  {
    word: "FOCUS",
    letters: ["S", "O", "F", "U", "C", "A", "T"],
    hint: "Bringing attention back to one thing at a time.",
  },
  {
    word: "SUPPORT",
    letters: ["P", "S", "T", "U", "O", "R", "P", "B", "A"],
    hint: "What we receive from trusted people, routines, and care.",
  },
];

type QuizLevel = {
  question: string;
  options: string[];
  answer: string;
  note: string;
};

const QUIZ_LEVELS: QuizLevel[] = [
  {
    question: "What is a helpful first step when anxiety feels loud?",
    options: ["Name five things you see", "Ignore every feeling", "Hold your breath"],
    answer: "Name five things you see",
    note: "Grounding through the senses can help the body notice the present moment.",
  },
  {
    question: "Which thought is more self-compassionate?",
    options: ["I am learning", "I always fail", "I should never struggle"],
    answer: "I am learning",
    note: "Self-compassion leaves room for growth without harsh self-judgment.",
  },
  {
    question: "What can support sleep quality?",
    options: ["A steady wind-down routine", "Scrolling late in bed", "Caffeine at night"],
    answer: "A steady wind-down routine",
    note: "Small predictable routines can tell the nervous system it is safe to rest.",
  },
  {
    question: "What is a healthy boundary?",
    options: ["Saying what you can offer", "Saying yes to everything", "Hiding all needs"],
    answer: "Saying what you can offer",
    note: "Boundaries help protect energy while keeping relationships clear.",
  },
  {
    question: "When someone shares a hard feeling, what helps most?",
    options: ["Listen and validate", "Quickly fix everything", "Change the subject"],
    answer: "Listen and validate",
    note: "Being heard can reduce isolation and make support feel safer.",
  },
];

type SwipeLevel = {
  prompt: string;
  kind: "keep" | "release";
  note: string;
};

const SWIPE_LEVELS: SwipeLevel[] = [
  {
    prompt: "I can pause before I respond.",
    kind: "keep",
    note: "This thought creates space between a feeling and an action.",
  },
  {
    prompt: "Everyone must like me for me to be okay.",
    kind: "release",
    note: "Your worth can stay steady even when approval changes.",
  },
  {
    prompt: "One small step still counts.",
    kind: "keep",
    note: "Small steps are often how calmer days begin.",
  },
  {
    prompt: "If I feel anxious, something bad is definitely happening.",
    kind: "release",
    note: "Anxiety is a signal, not always a fact.",
  },
  {
    prompt: "I am allowed to ask for support.",
    kind: "keep",
    note: "Support is a healthy resource, not a weakness.",
  },
  {
    prompt: "I can only rest after everything is finished.",
    kind: "release",
    note: "Rest is part of caring for your energy, not a prize you have to earn.",
  },
  {
    prompt: "This feeling is temporary.",
    kind: "keep",
    note: "Naming a feeling as temporary can make it easier to sit beside.",
  },
  {
    prompt: "One mistake means the whole day is ruined.",
    kind: "release",
    note: "A hard moment does not get to define the whole day.",
  },
  {
    prompt: "I can return to my breath for one minute.",
    kind: "keep",
    note: "A short reset can help your body find the present again.",
  },
  {
    prompt: "I should be able to handle everything alone.",
    kind: "release",
    note: "Needing help is human, and connection can make stress lighter.",
  },
  {
    prompt: "My pace can be different today.",
    kind: "keep",
    note: "Flexible pacing helps you respond to what your mind and body need.",
  },
  {
    prompt: "If I cannot do it perfectly, I should not start.",
    kind: "release",
    note: "Imperfect starts still create movement.",
  },
];

function shuffleDeck(levels: SwipeLevel[]) {
  return [...levels].sort(() => Math.random() - 0.5);
}

type GameId = "word" | "quiz" | "swipe";

const GAME_CARDS: Array<{
  id: GameId;
  title: string;
  label: string;
  blurb: string;
  action: string;
  levels: number;
}> = [
  {
    id: "word",
    title: "Word Guess",
    label: "Vocabulary",
    blurb: "Arrange mental health themed letters into the right word across five levels.",
    action: "Play Word",
    levels: WORD_LEVELS.length,
  },
  {
    id: "quiz",
    title: "Perspective Quiz",
    label: "Awareness",
    blurb: "Answer five gentle questions about support, boundaries, rest, and coping.",
    action: "Play Quiz",
    levels: QUIZ_LEVELS.length,
  },
  {
    id: "swipe",
    title: "Calm Swipe",
    label: "Card Game",
    blurb: "Swipe a shuffled deck of thoughts to keep close or release.",
    action: "Play Swipe",
    levels: SWIPE_LEVELS.length,
  },
];

type Article = {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  duration: string;
  paragraphs: string[];
};

const ARTICLES: Article[] = [
  {
    id: "neuroplasticity",
    chapter: "01",
    title: "Neuroplasticity",
    subtitle: "How the brain quietly reshapes itself.",
    duration: "5 min",
    paragraphs: [
      "Each time you try something new, your brain makes tiny pathways a little stronger. Over time, those pathways can change how you feel and what you notice.",
      "This article invites you to notice the small ways your habits shape your thinking. When you return to an idea again and again, the brain learns a kinder path.",
      "The work is gentle: small repetitions, small rewrites, one calm moment at a time.",
    ],
  },
  {
    id: "vagus-nerve",
    chapter: "02",
    title: "The Vagus Nerve",
    subtitle: "Tapping into your body's calm circuit.",
    duration: "6 min",
    paragraphs: [
      "The vagus nerve carries signals between your body and brain. When you slow your breath, it helps your body know it is safe.",
      "This article walks through how simple pauses can quiet the nervous system and help your feelings settle, even if the day still feels busy.",
      "A few deep breaths can make space for a clearer, softer response when thoughts feel loud.",
    ],
  },
  {
    id: "cognitive-distortions",
    chapter: "03",
    title: "Cognitive Distortions",
    subtitle: "Spotting the small lies the mind tells.",
    duration: "7 min",
    paragraphs: [
      "The mind can slip into thinking in black-or-white terms, jumping to the worst-case, or blaming itself too harshly.",
      "This article helps you name those habits and notice them without needing to fix everything right away.",
      "Once a thought is named, it becomes easier to choose a gentler response.",
    ],
  },
  {
    id: "habit-loop",
    chapter: "04",
    title: "The Habit Loop",
    subtitle: "Small actions that support steady change.",
    duration: "5 min",
    paragraphs: [
      "Habits grow from a cue, a routine, and a reward. When you change just one part, the whole loop can shift.",
      "This article explores how tiny, repeated choices can make calm feel more possible over time.",
      "A gentle routine can be a quiet way to bring a new feeling into your day.",
    ],
  },
];

function LibraryPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleExcerpt, setArticleExcerpt] = useState<string[]>([]);
  const [showFullArticle, setShowFullArticle] = useState(false);
  const [showArticleGames, setShowArticleGames] = useState(false);
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedArticle) {
      const slices = selectedArticle.paragraphs;
      const count = Math.random() > 0.4 ? 2 : 1;
      setArticleExcerpt(slices.slice(0, count));
      setShowFullArticle(false);
      setShowArticleGames(false);
    }
  }, [selectedArticle]);

  useEffect(() => {
    const target = activeGame || selectedArticle ? screenRef.current : cardsRef.current;
    if (!target) return;

    gsap.fromTo(
      target,
      { autoAlpha: 0, y: 22 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        ease: "power3.out",
      },
    );

    if (!activeGame && cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.querySelectorAll(".game-card"),
        { autoAlpha: 0, y: 24, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.09,
        },
      );
    }
  }, [activeGame, selectedArticle, showArticleGames]);

  useEffect(() => {
    if (showArticleGames && cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showArticleGames]);

  if (activeGame) {
    return (
      <div ref={screenRef} className="space-y-5">
        <button
          type="button"
          onClick={() => setActiveGame(null)}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-sage-700 shadow-xs transition hover:bg-sage-50"
        >
          <ArrowLeft className="size-4" />
          Games
        </button>

        {activeGame === "word" ? (
          <WordGuessGame />
        ) : activeGame === "quiz" ? (
          <QuizGame />
        ) : (
          <SwipeGame />
        )}
      </div>
    );
  }

  if (selectedArticle) {
    return (
      <div ref={screenRef} className="space-y-8">
        <button
          type="button"
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-sage-700 shadow-xs transition hover:bg-sage-50"
        >
          <ArrowLeft className="size-4" />
          Chapters
        </button>

        <article className="rounded-3xl border border-sage-900/5 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-sage-600">
            <span>Chapter {selectedArticle.chapter}</span>
            <span>{selectedArticle.duration}</span>
          </div>
          <h1 className="mt-4 font-display text-3xl">{selectedArticle.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-sage-600">{selectedArticle.subtitle}</p>
          {(showFullArticle ? selectedArticle.paragraphs : articleExcerpt).map((paragraph, index) => (
            <p key={index} className="mt-4 text-sm leading-relaxed text-sage-600">
              {paragraph}
            </p>
          ))}
          {!showFullArticle && selectedArticle.paragraphs.length > articleExcerpt.length && (
            <button
              type="button"
              onClick={() => setShowFullArticle(true)}
              className="mt-6 inline-flex w-full justify-center rounded-2xl border border-sage-900/10 bg-white px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-sage-900 transition hover:bg-sage-50"
            >
              Read more
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setActiveGame(null);
              setShowArticleGames(true);
            }}
            className="mt-4 inline-flex w-full justify-center rounded-2xl bg-sage-900 px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground transition hover:bg-sage-700"
          >
            Explore games for this article
          </button>
        </article>

        {showArticleGames && (
          <section ref={cardsRef} className="space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-sage-600">
                Related practice
              </span>
              <h2 className="font-display text-2xl">Games for “{selectedArticle.title}”</h2>
              <p className="max-w-[42ch] text-sm leading-relaxed text-sage-600">
                Choose a gentle game that helps you practice the ideas you just read about.
              </p>
            </div>
            {GAME_CARDS.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onSelect={() => setActiveGame(game.id)}
              />
            ))}
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <header>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-sage-600">
          The Learning Hub
        </span>
        <h1 className="mt-2 font-display text-3xl">A quiet curriculum.</h1>
        <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-sage-600">
          Short readings, written by clinicians. Take one when you have a moment.
        </p>
      </header>

      <section ref={cardsRef} className="space-y-4 opacity-0">
        {ARTICLES.map((article) => (
          <button
            key={article.id}
            type="button"
            onClick={() => setSelectedArticle(article)}
            className="w-full rounded-3xl border border-sage-900/5 bg-white p-5 text-left shadow-xs transition hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.99]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-sage-50 text-sage-700 font-mono text-sm font-semibold">
                {article.chapter}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-sage-500">
                  <span>Chapter {article.chapter}</span>
                  <span>{article.duration}</span>
                </div>
                <h2 className="font-display text-2xl">{article.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-sage-600">
                  {article.subtitle}
                </p>
              </div>
            </div>
          </button>
        ))}
      </section>
    </div>
  );
}

function GameCard({ game, onSelect }: { game: (typeof GAME_CARDS)[number]; onSelect: () => void }) {
  const Icon = game.id === "word" ? Puzzle : game.id === "quiz" ? MessageCircleQuestion : Shuffle;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="game-card w-full rounded-3xl border border-sage-900/5 bg-white p-5 text-left shadow-xs transition hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.99]"
    >
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sage-50 text-sage-700">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">
              {game.label}
            </span>
            <LevelBadge current={game.levels} total={game.levels} compact />
          </div>
          <h2 className="mt-2 font-display text-2xl">{game.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-sage-600">{game.blurb}</p>
          <span className="mt-4 inline-flex rounded-full bg-sage-900 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground">
            {game.action}
          </span>
        </div>
      </div>
    </button>
  );
}

function WordGuessGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [message, setMessage] = useState("Tap letters to fill the boxes.");
  const level = WORD_LEVELS[levelIndex];
  const guess = picked.map((i) => level.letters[i]).join("");
  const complete = levelIndex === WORD_LEVELS.length - 1 && guess === level.word;

  const slots = useMemo(
    () => Array.from({ length: level.word.length }, (_, i) => guess[i] ?? ""),
    [guess, level.word.length],
  );

  function resetGuess(nextMessage = "Tap letters to fill the boxes.") {
    setPicked([]);
    setMessage(nextMessage);
  }

  function handleLetter(index: number) {
    if (picked.includes(index) || picked.length >= level.word.length) return;
    const nextPicked = [...picked, index];
    const nextGuess = nextPicked.map((i) => level.letters[i]).join("");
    setPicked(nextPicked);

    if (nextGuess.length !== level.word.length) {
      setMessage("Keep going.");
      return;
    }

    if (nextGuess === level.word) {
      setMessage(
        levelIndex === WORD_LEVELS.length - 1
          ? "You finished all five word levels."
          : "Correct. Move to the next word.",
      );
    } else {
      setMessage("Not quite. Try the letters in a new order.");
    }
  }

  function goNextLevel() {
    if (levelIndex < WORD_LEVELS.length - 1) {
      setLevelIndex((i) => i + 1);
      resetGuess("New word. Use the hint.");
    }
  }

  return (
    <section className="rounded-3xl border border-sage-900/5 bg-white p-5 shadow-xs">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">
            Word Guess
          </span>
          <h2 className="mt-1 font-display text-2xl">Find the feeling word.</h2>
        </div>
        <LevelBadge current={levelIndex + 1} total={WORD_LEVELS.length} />
      </div>

      <p className="mt-4 rounded-2xl bg-sage-50 p-4 text-sm leading-relaxed text-sage-700">
        {level.hint}
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {slots.map((letter, index) => (
          <div
            key={`${level.word}-${index}`}
            className="grid size-12 place-items-center rounded-2xl border border-sage-900/10 bg-sand-100 font-display text-xl"
          >
            {letter}
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-5 gap-2">
        {level.letters.map((letter, index) => {
          const isPicked = picked.includes(index);
          return (
            <button
              key={`${letter}-${index}`}
              type="button"
              onClick={() => handleLetter(index)}
              disabled={isPicked || complete}
              className="grid aspect-square place-items-center rounded-2xl bg-sage-100 font-semibold text-sage-900 transition hover:bg-sage-200 disabled:opacity-35"
            >
              {letter}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-sm text-sage-600">{message}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => resetGuess()}
            aria-label="Reset word guess"
            className="grid size-10 place-items-center rounded-full border border-sage-900/10 text-sage-600 transition hover:bg-sage-50"
          >
            <RotateCcw className="size-4" />
          </button>
          <button
            type="button"
            onClick={goNextLevel}
            disabled={guess !== level.word || levelIndex === WORD_LEVELS.length - 1}
            className="rounded-full bg-sage-900 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-sage-600 disabled:cursor-not-allowed disabled:opacity-35"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

function QuizGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const level = QUIZ_LEVELS[levelIndex];
  const isCorrect = selected === level.answer;
  const finished = levelIndex === QUIZ_LEVELS.length - 1 && answered && isCorrect;

  function choose(option: string) {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
  }

  function nextQuestion() {
    if (levelIndex < QUIZ_LEVELS.length - 1) {
      setLevelIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  function retryQuestion() {
    setSelected(null);
    setAnswered(false);
  }

  return (
    <section className="rounded-3xl border border-sage-900/5 bg-white p-5 shadow-xs">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">
            Perspective Quiz
          </span>
          <h2 className="mt-1 font-display text-2xl">Choose the kind answer.</h2>
        </div>
        <LevelBadge current={levelIndex + 1} total={QUIZ_LEVELS.length} />
      </div>

      <div className="mt-5 rounded-2xl bg-sage-50 p-5">
        <HelpCircle className="mb-3 size-5 text-sage-500" />
        <p className="text-base font-medium leading-relaxed">{level.question}</p>
      </div>

      <div className="mt-4 space-y-2">
        {level.options.map((option) => {
          const isSelected = selected === option;
          const showCorrect = answered && option === level.answer;
          const showWrong = answered && isSelected && !isCorrect;

          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              className={
                "flex w-full items-center justify-between rounded-2xl border p-4 text-left text-sm transition " +
                (showCorrect
                  ? "border-sage-600 bg-sage-100 text-sage-900"
                  : showWrong
                    ? "border-red-200 bg-red-50 text-red-900"
                    : "border-sage-900/10 hover:bg-sage-50")
              }
            >
              <span>{option}</span>
              {showCorrect ? <Check className="size-4" /> : null}
            </button>
          );
        })}
      </div>

      <div className="mt-5 min-h-20 rounded-2xl border border-sage-900/5 bg-sand-100 p-4">
        {answered ? (
          <>
            <p className="text-sm font-semibold">
              {isCorrect ? "That is right." : "Close. Try the gentler option."}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-sage-600">
              {isCorrect ? level.note : "Look for the answer that supports steadiness and care."}
            </p>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-sage-600">
            Pick the response that supports mental wellbeing.
          </p>
        )}
      </div>

      <div className="mt-5 flex justify-end gap-2">
        {answered && !isCorrect ? (
          <button
            type="button"
            onClick={retryQuestion}
            className="rounded-full border border-sage-900/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-sage-700 transition hover:bg-sage-50"
          >
            Retry
          </button>
        ) : null}
        <button
          type="button"
          onClick={nextQuestion}
          disabled={!answered || !isCorrect || levelIndex === QUIZ_LEVELS.length - 1}
          className="rounded-full bg-sage-900 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-sage-600 disabled:cursor-not-allowed disabled:opacity-35"
        >
          {finished ? "Done" : "Next"}
        </button>
      </div>
    </section>
  );
}

function SwipeGame() {
  const [deck, setDeck] = useState<SwipeLevel[]>(() => shuffleDeck(SWIPE_LEVELS));
  const [levelIndex, setLevelIndex] = useState(0);
  const [kept, setKept] = useState(0);
  const [released, setReleased] = useState(0);
  const [feedback, setFeedback] = useState("Swipe right to keep. Swipe left to release.");
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const level = deck[levelIndex];
  const done = levelIndex >= deck.length;
  const rotation = Math.max(-10, Math.min(10, dragX / 14));

  function moveNext(choice: SwipeLevel["kind"]) {
    if (!level || isMoving) return;
    const isCorrect = choice === level.kind;
    setIsMoving(true);

    if (choice === "keep") {
      setKept((count) => count + 1);
    } else {
      setReleased((count) => count + 1);
    }

    setFeedback(isCorrect ? level.note : "Good noticing. This one may fit better the other way.");
    setDragX(choice === "keep" ? 180 : -180);

    window.setTimeout(() => {
      setLevelIndex((index) => index + 1);
      setDragStart(null);
      setDragX(0);
      setIsMoving(false);
      if (levelIndex < deck.length - 1) {
        setFeedback("Swipe right to keep. Swipe left to release.");
      }
    }, 380);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (done || isMoving) return;
    cardRef.current?.setPointerCapture(event.pointerId);
    setDragStart(event.clientX);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (dragStart === null || done || isMoving) return;
    setDragX(event.clientX - dragStart);
  }

  function handlePointerUp() {
    if (dragStart === null || done || isMoving) return;
    if (dragX > 80) {
      moveNext("keep");
    } else if (dragX < -80) {
      moveNext("release");
    } else {
      setDragStart(null);
      setDragX(0);
    }
  }

  function restart() {
    setDeck(shuffleDeck(SWIPE_LEVELS));
    setLevelIndex(0);
    setKept(0);
    setReleased(0);
    setFeedback("Swipe right to keep. Swipe left to release.");
    setDragStart(null);
    setDragX(0);
    setIsMoving(false);
  }

  if (done) {
    return (
      <section className="rounded-3xl border border-sage-900/5 bg-white p-6 text-center shadow-xs">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-ochre/15">
          <Heart className="size-5 text-ochre" />
        </div>
        <h2 className="mt-4 font-display text-2xl">Deck complete.</h2>
        <p className="mx-auto mt-2 max-w-[30ch] text-sm leading-relaxed text-sage-600">
          You kept {kept} thoughts close and released {released}. Notice what your mind chose.
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage-900 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-sage-600"
        >
          <RotateCcw className="size-4" />
          Again
        </button>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-sage-900/5 bg-white p-5 shadow-xs">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">
            Calm Swipe
          </span>
          <h2 className="mt-1 font-display text-2xl">Keep or release.</h2>
        </div>
        <LevelBadge current={levelIndex + 1} total={deck.length} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 text-center text-xs font-semibold uppercase tracking-widest">
        <div className="rounded-2xl bg-sand-100 px-3 py-2 text-sage-500">Release</div>
        <div className="rounded-2xl bg-sage-50 px-3 py-2 text-sage-700">Keep</div>
      </div>

      <div className="relative mt-5 grid min-h-[280px] place-items-center rounded-3xl bg-gradient-to-b from-sage-50 to-sand-200 p-5">
        <div className="absolute inset-x-8 top-8 h-52 rotate-[-5deg] rounded-3xl bg-white/55" />
        <div className="absolute inset-x-10 top-10 h-52 rotate-[5deg] rounded-3xl bg-white/70" />
        <div
          ref={cardRef}
          role="button"
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative z-10 grid h-56 w-full max-w-[19rem] touch-none select-none place-items-center rounded-3xl border border-sage-900/5 bg-white p-7 text-center shadow-sm transition-transform duration-150"
          style={{
            transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
            opacity: Math.max(0.4, 1 - Math.abs(dragX) / 260),
          }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-sage-400">
            Thought card
          </span>
          <p className="mt-3 font-display text-2xl leading-snug text-balance">"{level.prompt}"</p>
          <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-sage-500">
            <ArrowLeft className="size-4" />
            Swipe
            <ArrowRight className="size-4" />
          </div>
        </div>
      </div>

      <p className="mt-4 min-h-10 text-sm leading-relaxed text-sage-600">{feedback}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => moveNext("release")}
          disabled={isMoving}
          className="rounded-2xl border border-sage-900/10 bg-white py-4 text-sm font-semibold text-sage-700 transition hover:bg-sage-50"
        >
          Release
        </button>
        <button
          type="button"
          onClick={() => moveNext("keep")}
          disabled={isMoving}
          className="rounded-2xl bg-sage-900 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-sage-600"
        >
          Keep
        </button>
      </div>
    </section>
  );
}

function LevelBadge({
  current,
  total,
  compact = false,
}: {
  current: number;
  total: number;
  compact?: boolean;
}) {
  return (
    <div
      className={
        "flex shrink-0 items-center gap-1.5 rounded-full bg-sage-50 text-xs font-semibold text-sage-700 " +
        (compact ? "px-2.5 py-1.5" : "px-3 py-2")
      }
    >
      <Sparkles className="size-3.5 text-ochre" />
      {current}/{total}
    </div>
  );
}
