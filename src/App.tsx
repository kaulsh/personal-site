import { css } from "@emotion/react";
import { ICONS } from "./icons";
import { LinkButton } from "./components";
import RevealChildren from "./RevealChildren";

function App() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `}
      >
        <RevealChildren show={true} type="div">
          <h1>Hi!</h1>
          <h3>You can find me on the internet at</h3>
          <LinkButton
            text="@kaulsh"
            icon={ICONS.twitter}
            link="https://www.twitter.com/kaulsh"
          />
          <LinkButton
            text="bsky: @shashank.gg"
            icon={ICONS.bluesky}
            link="https://bsky.app/profile/shashank.gg"
          />
          <LinkButton
            text="@kaulsh"
            icon={ICONS.github}
            link="https://www.github.com/kaulsh"
          />
          <LinkButton
            text="kaulshashank"
            icon={ICONS.linkedin}
            link="https://www.linkedin.com/in/kaulshashank"
          />
          <p>Built with minimal effort.</p>
        </RevealChildren>
      </div>
    </div>
  );
}

export default App;
