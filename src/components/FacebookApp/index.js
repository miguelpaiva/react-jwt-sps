import React from "react";

import "./styles.css";
import { useInitFbSDK } from "./fb-hooks";

// You can find your Page ID
// in the "About" section of your page on Facebook.
const PAGE_ID = "me";

function FacebookApp() {
  // Initializes the Facebook SDK
  const isFbSDKInitialized = useInitFbSDK();

  // App state
  const [fbUserAccessToken, setFbUserAccessToken] = React.useState();
  const [fbPageAccessToken, setFbPageAccessToken] = React.useState();
  const [postText, setPostText] = React.useState();
  const [isPublishing, setIsPublishing] = React.useState(false);

  // const fbPageAccessToken = "EAAC2MjZBWeoMBAPllRDBPFlPwve2E6MsgMNKVc2aR776yFDnxF84IGxI8t6OPliMZBvQbC22xeDDP0MvXZAyVkv6KvT3qHcH6uUROoSQVWZCk13ZBFXKse8CSKObMDadsZAYJLn3F4JBesa20vRTHM6aQHO7wxYJ3rBnKeii9I81IWvEQESbV06z5NAbGUu1YZD";

  // Logs in a Facebook user
  const logInToFB = React.useCallback(() => {
    window.FB.login((response) => {
      setFbUserAccessToken(response.authResponse.accessToken);
    });
  }, []);

  // Logs out the current Facebook user
  const logOutOfFB = React.useCallback(() => {
    window.FB.logout(() => {
      setFbUserAccessToken(null);
      setFbPageAccessToken(null);
    });
  }, []);

  // Checks if the user is logged in to Facebook
  React.useEffect(() => {
    if (isFbSDKInitialized) {
      window.FB.getLoginStatus((response) => {
        setFbUserAccessToken(response.authResponse?.accessToken);
      });
    }
  }, [isFbSDKInitialized]);

  // Fetches an access token for the page
  React.useEffect(() => {
    if (fbUserAccessToken) {
      window.FB.api(
        `/${PAGE_ID}?fields=access_token&access_token=${fbUserAccessToken}`,
        ({ access_token }) => setFbPageAccessToken(access_token)
      );
    }
  }, [fbUserAccessToken]);

  // Publishes a post on the Facebook page
  const sendPostToPage = React.useCallback(() => {
    setIsPublishing(true);

    window.FB.api(
      `/${PAGE_ID}/feed`,
      "POST",
      {
        message: postText,
        access_token: fbPageAccessToken,
      },
      () => {
        setPostText("");
        setIsPublishing(false);
      }
    );
  }, [postText, fbPageAccessToken]);

  // UI with custom styling from ./styles.css`
  return (
    <div id="app">
      <header id="app-header">
        <p id="logo-text">Facebook Page API</p>
        {fbUserAccessToken ? (
          <button onClick={logOutOfFB} className="btn confirm-btn">
            Log out
          </button>
        ) : (
          <button onClick={logInToFB} className="btn confirm-btn">
            Login with Facebook
          </button>
        )}
      </header>
      <main id="app-main">
        {fbPageAccessToken ? (
          <section className="app-section">
            <h3>Write something to the page</h3>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Message..."
              rows="8"
              disabled={isPublishing}
            />
            <button
              onClick={sendPostToPage}
              className="btn confirm-btn"
              disabled={!postText || isPublishing}
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </button>
          </section>
        ) : (
          <h2 className="placeholder-container">Welcome!</h2>
        )}
      </main>
    </div>
  );
}

export default FacebookApp;
