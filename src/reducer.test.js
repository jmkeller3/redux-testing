import reducer from "./reducer";
import { restartGame, generateAuralUpdate, makeGuess } from "./actions";

describe("reducer", () => {
  // sudo data
  const guesses_0 = [];
  const guesses_1 = [3];
  const guesses_2 = [3, 50];
  const feedback_0 = "Make your guess!";
  const auralStatus_0 = "";
  const correctAnswer_0 = 1;

  it("Should set the inital state when nothing is passed in", () => {
    const state = reducer(undefined, { type: "__UNKOWN" });
    expect(state).toEqual({
      ...state
    });
  });

  it("Should return the current state on an unknown action", () => {
    let currentState = {};
    const state = reducer(currentState, { type: "__UNKNOWN" });
    expect(state).toBe(currentState);
  });

  describe("restartGame", () => {
    it("Should restart the game", () => {
      let state = {
        guesses: guesses_2,
        feedback: "Awesome",
        correctAnswer: 4
      };
      state = reducer(state, restartGame(correctAnswer_0));
      expect(state).toEqual({
        ...state,
        correctAnswer: correctAnswer_0
      });
    });
  });

  describe("makeGuess", () => {
    it("Should reject non-numbers", () => {
      let state;
      state = reducer(state, makeGuess("guess"));
      expect(state).toEqual({
        ...state,
        feedback: "Please enter a valid number."
      });
    });

    it("Should add each guess to the guess array", () => {
      let state;
      state = reducer(state, makeGuess(5));
      expect(state).toEqual({
        ...state,
        guesses: [5]
      });
    });

    it("Should make a guess", () => {
      let state = {
        guesses: [],
        feedback: "",
        correctAnswer: 100
      };

      state = reducer(state, makeGuess(25));
      expect(state.guesses).toEqual([25]);
      expect(state.feedback).toEqual("You're Ice Cold...");

      state = reducer(state, makeGuess(60));
      expect(state.guesses).toEqual([25, 60]);
      expect(state.feedback).toEqual("You're Cold...");

      state = reducer(state, makeGuess(80));
      expect(state.guesses).toEqual([25, 60, 80]);
      expect(state.feedback).toEqual("You're Warm.");

      state = reducer(state, makeGuess(95));
      expect(state.guesses).toEqual([25, 60, 80, 95]);
      expect(state.feedback).toEqual("You're Hot!");

      state = reducer(state, makeGuess(100));
      expect(state.guesses).toEqual([25, 60, 80, 95, 100]);
      expect(state.feedback).toEqual("You got it!");
    });

    it("Should return a string with feedback", () => {
      let state = {
        guesses: [25, 3, 90],
        feedback: "You're Warm.",
        auralStatus: ""
      };
      state = reducer(state, generateAuralUpdate());
      expect(state.auralStatus).toEqual(
        "Here's the status of the game right now: You're Warm. You've made 3 guesses. In order of most- to least-recent, they are: 90, 3, 25"
      );
    });
  });
});
