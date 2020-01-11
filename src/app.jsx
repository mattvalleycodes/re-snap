import React, { useState, useEffect } from "react";
import Button from "./components/button";
import Card from "./components/card";
import Counter from "./components/counter";
import Slider from "./components/slider";
import Snap from "./snap";

const App = () => {
  const [computerInterval, setComputerInterval] = useState(2);
  const [lastAutoCallSnap, setLastAutoCallSnap] = useState(null);
  const [snap] = useState(new Snap());
  const [, forceUpdate] = useState(0);
  const rerender = () => forceUpdate((c) => c + 1);

  /*
   * The app tries to "Call Snap" every second on behalf of the computer player. Also, it makes sure
   * that it does it based on the interval that is set by the user.
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!snap.isCallSnap()) return;

      /*
       * Don't try to snap earlier than the expected time.
       */
      const now = new Date().getTime();
      if (lastAutoCallSnap) {
        const sinceLastCallSnap = now - lastAutoCallSnap;
        if (sinceLastCallSnap < computerInterval * 1000) return;
      }

      snap.call("A");
      setLastAutoCallSnap(now);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const onStartClicked = () => {
    snap.restart();
    if (snap.toPlayNext === "A") snap.play();
    rerender();
  };

  const onPlayClicked = () => {
    snap.play();
    rerender();

    if (snap.isGameOver()) return;

    /*
     * TODO: introducing effects to components like this is a bad idea.
     * The proper way should be via hooks and proper handling of clearing timeout to prevent
     * memory leaks and nasty problems. This is not meant to be production ready so I'm going to
     * take it easy.
     */
    setTimeout(() => {
      snap.play();
      rerender();
    }, 1000);
  };

  const onCallSnapClicked = () => {
    /*
     * TODO: show a decent message to the user
     * You can't snap with less than two cards.
     */
    if (!snap.isCallSnap()) return;

    snap.call("B");
    rerender();
  };

  const onComputeIntervalChanged = (props, newComputerInterval) => {
    setComputerInterval(newComputerInterval);
  };

  /*
   * The game has not yet started! Simply show the "Start" UI.
   */
  if (!snap.decks) {
    return <Button onClick={onStartClicked}>Start the game!</Button>;
  }

  if (snap.isGameOver()) {
    return (
      <div>
        <span>
          The {snap.toPlayNext === "A" ? "Computer" : "User"} is winner of this
          game!
        </span>
        <br />
        <br />
        <Button onClick={onStartClicked}>Restart the game!</Button>
      </div>
    );
  }

  const mostRecentlyPlayedCard =
    snap.decks.played[snap.decks.played.length - 1];
  const isAPlaying = snap.toPlayNext === "A";
  const isBPlaying = !isAPlaying;

  return (
    <div>
      <div className="app__decks">
        <div className="app__deck">
          <Counter cards={snap.decks.A.length} className="app__deck-count" />
          <Card onClick={onPlayClicked} disabled={!isAPlaying} />
        </div>
        <div className="app__deck">
          <Card
            type={mostRecentlyPlayedCard && mostRecentlyPlayedCard.type}
            rank={mostRecentlyPlayedCard && mostRecentlyPlayedCard.rank}
            onClick={onCallSnapClicked}
          />
        </div>
        <div className="app__deck">
          <Counter cards={snap.decks.B.length} className="app__deck-count" />
          <Card onClick={onPlayClicked} disabled={!isBPlaying} />
        </div>
      </div>
      <div>
        Computer does the Call Snap in {computerInterval} seconds. Adjust it
        using the slider:
        <Slider
          min={1}
          max={10}
          value={computerInterval}
          onChange={onComputeIntervalChanged}
        />
        <br />
      </div>
      <Button onClick={onStartClicked}>Restart the game!</Button>&nbsp;
    </div>
  );
};

export default App;
