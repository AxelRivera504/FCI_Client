import React from "react";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const DropdownMenuComponent = ({ options, onSelect, iconClass = "pe-7s-menu" }) => {
  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle className="btn-icon btn-icon-only" color="link">
        <i className={`${iconClass} btn-icon-wrapper`} />
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link">
        <DropdownItem header>Opciones</DropdownItem>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => onSelect(option)}>
            <i className={`dropdown-icon ${option.icon}`}></i>
            <span>{option.label}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
};

export default DropdownMenuComponent;
