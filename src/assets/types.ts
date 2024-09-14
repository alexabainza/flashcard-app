export type CarouselType = {
    next: () => void;
    prev: () => void;
  };

  export type Flashcard  = {
    id: number;
    question: string;
    answer: string;
  };