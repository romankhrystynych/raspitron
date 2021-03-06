import React, { Component, PropTypes } from 'react';
import { Layout, Drawer, Panel, AppBar } from 'react-toolbox';
import Navigation from '../components/navigation';
import Clock from '../components/clock';

import styles from './_container.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false
    };
  }

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  };

  render() {
    return (
      <Layout className={styles.layout}>
        <Drawer
          className={styles.navDrawer}
          active={this.state.drawerActive}
          onOverlayClick={this.toggleDrawerActive}
        >
          <Navigation
            goto={this.toggleDrawerActive.bind(this)}
          />
        </Drawer>
        <Panel>
          <AppBar className={styles.bar} leftIcon='menu' onLeftIconClick={this.toggleDrawerActive}>
            <Clock />
          </AppBar>
          <div className={'container'}>
            { this.props.children }
          </div>
        </Panel>
      </Layout>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
