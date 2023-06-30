import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import { PermissionContext } from "../contexts/permission-context";
import styles from "./../styles/components/Dropdown.module.css"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      selectedOption: props.selectedOption,
      isDropdownOpen: false,
      cmSearchInput: props.value || "",
    };
  }

  toggleDropdown = (e) => {
    this.props.onClick();
    this.setState(
      (state) => ({ isDropdownOpen: !state.isDropdownOpen }),
      () => {
        if (this.state.isDropdownOpen) {
          window.addEventListener("mousedown", this.handleOutsideClick);
        } else window.removeEventListener("mousedown", this.handleOutsideClick);
      }
    );
  };

  handleOutsideClick = (e) => {
    if (this.elem && !this.elem.contains(e.target)) {
      this.toggleDropdown(e);
    }
  };

  handleClick = (e, selectedOption) => {
    this.setState({ selectedOption });
    this.toggleDropdown(e);
    this.props.handleOptionSelect(
      null,
      selectedOption,
      this.props.type,
      this.props.component_type
    );
  };

  handleChange = (e) => {
    this.setState({ [e.target.dataset.id]: e.target.value });
  };

  render() {
    const {
      options,
      selectedOption,
      isDropdownOpen,
      cmSearchInput,
    } = this.state;

    return (
      <PermissionContext.Consumer>
        {(value) => {
          return (
            <div
              className={cx("dropdown-wrapper")}
              ref={(node) => (this.elem = node)}
            >
              <CSSTransition
                in={isDropdownOpen}
                timeout={300}
                classNames="cm-p-builder-dropdown-fade"
              >
                <div>
                  <div
                    className={cx({
                      "dropdown-input": isDropdownOpen,
                      "dropdown-value": !isDropdownOpen
                    })}
                    onClick={
                      value.status === "Edit" ? this.toggleDropdown : undefined
                    }
                  >
                    {isDropdownOpen ? (
                      <input
                        onChange={this.handleChange}
                        onClick={(e) => e.stopPropagation()}
                        data-id="cmSearchInput"
                        value={cmSearchInput}
                        autoFocus
                      />
                    ) : (
                      <div
                        className={cx({
                          "value-text-edit": value.status === "Edit",
                          "value-text-read": value.status !== "Edit"
                        })}
                      >
                        <span>
                          <i
                            className={cx({
                              "fa-light fa-hashtag": this.props.component_type === "category_id",
                              "fa-light fa-folder-open": this.props.component_type !== "category_id",
                            })}
                          />
                        </span>
                        {(selectedOption && selectedOption.name) ||
                          (value.status === "Edit" &&
                            (this.props.component_type === "category_id"
                              ? "Select Categories"
                              : "Select Office"))}
                      </div>
                    )}
                  </div>
                  {isDropdownOpen && (
                    <div className={cx("dropdown-list-body")}>
                      {options
                        .filter(
                          (option) =>
                            !cmSearchInput ||
                            option.name
                              .toLowerCase()
                              .includes(cmSearchInput.toLowerCase())
                        )
                        .map((option, i) => (
                          <div
                            key={`dropdown-${option.id || i}`}
                            className={cx("dropdown-item")}
                            onClick={(e) => this.handleClick(e, option)}
                          >
                            {option.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </CSSTransition>
            </div>
          );
        }}
      </PermissionContext.Consumer>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedOption: PropTypes.object,
  handleOptionSelect: PropTypes.func.isRequired,
};
