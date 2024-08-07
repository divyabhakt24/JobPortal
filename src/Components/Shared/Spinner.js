import React from 'react'

const Spinner = () => {
    return (
        <div class="d-flex justify-content-center" style={{ marginTop: "50%" }}>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;

