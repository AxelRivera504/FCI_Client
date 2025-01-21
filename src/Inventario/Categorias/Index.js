import React, { Fragment } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// Importaciones de layout
import ThemeOptions from "../../Layout/ThemeOptions";
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";



// Importa el componente Productos
import Categoria from "./Categoria";

class Index extends React.Component {
  render() {
    return (
      <Fragment>
        {/* Theme Options */}
        <ThemeOptions />

        {/* Header */}
        <AppHeader />

        {/* Estructura Principal */}
        <div className="app-main">
          {/* Sidebar */}
          <AppSidebar />

          <div className="app-main__outer">
            <div className="app-main__inner">
              <TransitionGroup>
                <CSSTransition
                  component="div"
                  classNames="TabsAnimation"
                  appear={true}
                  timeout={1500}
                  enter={false}
                  exit={false}
                >
                  <div>
                 
                    <Categoria />
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </div>
            {/* Footer */}
            <AppFooter />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Index;
