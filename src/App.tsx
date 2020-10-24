import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'utils/theme';
import router, { defaultRouter, IRouter, routerTab } from 'utils/router';
import TabHeader from 'component/tab-header';

const Wrapper = styled.div`
  width: 85vw;
  margin: auto;
  margin-top: 2rem;
  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const PageWrapper = styled.div`
  padding: 2rem 4rem;
  /* background-color: ${(props) => props.theme.color.lightGray}; */
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Router>
          <TabHeader router={routerTab} />
          <Switch>
            {router.map((item: IRouter, index: number) => {
              const { path, exact = false } = item ?? {};
              return (
                <Route
                  key={index}
                  path={path}
                  exact={exact}
                  render={(props) => (
                    <PageWrapper>
                      <item.component {...props} />
                    </PageWrapper>
                  )}
                />
              );
            })}
            <Redirect exact={true} to={`${defaultRouter}`} />
          </Switch>
        </Router>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
