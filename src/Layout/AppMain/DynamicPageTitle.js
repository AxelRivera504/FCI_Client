import React from "react";
import { Card, CardBody } from "reactstrap";

const DynamicPageTitle = ({ heading, subheading, icon, children }) => {
    return (
        <div className="app-page-title">
            <div className="page-title-wrapper">
            <div className="page-title-heading">
                {icon && (
                <div className="page-title-icon">
                    <i className={icon} />
                </div>
                )}
                <div>
                <h3>{heading}</h3>
                <div className="page-title-subheading">{subheading}</div>
                </div>
            </div>

            {/* Sección de elementos dinámicos en fila */}
            <div className="page-title-actions" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                {children}
            </div>
            </div>
        </div>
    );
};
  export default DynamicPageTitle;