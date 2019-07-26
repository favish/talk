import React, { Component } from "react";

import { AppContainer_auth as AuthData } from "coral-auth/__generated__/AppContainer_auth.graphql";
import { AppContainer_viewer as UserData } from "coral-auth/__generated__/AppContainer_viewer.graphql";
import { AppContainerLocal as Local } from "coral-auth/__generated__/AppContainerLocal.graphql";
import {
  graphql,
  withFragmentContainer,
  withLocalStateContainer,
} from "coral-framework/lib/relay";

import AccountCompletionContainer from "./AccountCompletion";
import App from "./App";

interface Props {
  local: Local;
  auth: AuthData;
  viewer: UserData | null;
}

class AppContainer extends Component<Props> {
  public render() {
    const {
      local: { view },
      auth,
      viewer,
    } = this.props;
    return (
      <AccountCompletionContainer auth={auth} viewer={viewer}>
        <App view={view} auth={auth} />
      </AccountCompletionContainer>
    );
  }
}

const enhanced = withLocalStateContainer(
  graphql`
    fragment AppContainerLocal on Local {
      view
    }
  `
)(
  withFragmentContainer<Props>({
    auth: graphql`
      fragment AppContainer_auth on Auth {
        ...SignInContainer_auth
        ...SignUpContainer_auth
        ...AccountCompletionContainer_auth
      }
    `,
    viewer: graphql`
      fragment AppContainer_viewer on User {
        ...AccountCompletionContainer_viewer
      }
    `,
  })(AppContainer)
);

export default enhanced;
