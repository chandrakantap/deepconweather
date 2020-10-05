import React, { Component } from "react";
import clsx from "clsx";
import IconButton from "common/ui/IconButton";
import { MdClear } from "react-icons/md";
import styles from "./SearchInput.module.css";

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: "" };
    this.defferedTimeout = undefined;
  }
  componentWillUnmount() {
    if (this.defferedTimeout) {
      clearTimeout(this.defferedTimeout);
    }
  }
  onChangeInput = (event) => {
    event.preventDefault();
    this.setState({ searchQuery: event.target.value });
    if (this.defferedTimeout) {
      clearTimeout(this.defferedTimeout);
    }
    if (event.target.value.length > 0) {
      this.defferedTimeout = setTimeout(() => {
        this.callOnChange();
      }, 500);
    } else {
      this.defferedTimeout = setTimeout(() => {
        this.callOnChange();
      }, 20);
    }
  };
  callOnChange = () => {
    this.props.onChange(this.state.searchQuery);
  };
  clearSearch = () => {
    clearTimeout(this.defferedTimeout);
    this.setState({ searchQuery: "" });
    this.props.onChange("");
  };
  onKeyDown = (event) => {
    if (event.key === "Escape") {
      this.clearSearch();
      event.currentTarget.blur();
    }
  };
  render() {
    const { searchQuery } = this.state;

    return (
      <div className={styles.root}>
        <input
          type="text"
          className={clsx({
            [styles.searchTxtFld]: true,
            [styles.active]: searchQuery,
          })}
          value={searchQuery}
          onChange={this.onChangeInput}
          onKeyDown={this.onKeyDown}
          placeholder="Search for cities..."
        />
        {searchQuery && (
          <IconButton
            className={styles.closeSearchhBtn}
            onClick={this.clearSearch}
            data-testid="searchInputCloseSearchIcon"
          >
            <MdClear />
          </IconButton>
        )}
      </div>
    );
  }
}

export default SearchInput;
