import React, { Component } from "react";
import { RiWifiLine, RiWifiOffLine } from "react-icons/ri";
import IconButton from "common/ui/IconButton";
//import styles from './OnlineIndicator.module.css';

class OnlineIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: navigator.onLine };
    this.checkInterval = undefined;
  }
  componentDidMount() {
    this.checkInterval = setInterval(
      () => this.setState({ isOnline: navigator.onLine }),
      1000
    );
  }
  componentWillUnmount() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
  render() {
    const { isOnline } = this.state;
    if (isOnline) {
      return (
        <IconButton>
          <RiWifiLine />
        </IconButton>
      );
    }
    return (
      <IconButton>
        <RiWifiOffLine />
      </IconButton>
    );
  }
}

export default OnlineIndicator;
