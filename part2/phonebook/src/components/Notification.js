import React from 'react';

const Notification = ( {mensaje, isSuccessful} ) => {
    if (mensaje === null) {
        return null;
    }
    
    const estilos = {
        color: 'green',
        backgroundColor: 'lightgreen',
        padding: 15,
        border: 2,
        borderRadius: 10,
        borderColor: 'green',
        marginBottom: 10,
        borderStyle: 'solid'
    };

    if (isSuccessful === false) {
        estilos.color = 'red';
        estilos.backgroundColor = 'lightCoral';
        estilos.borderColor = 'red';
    }

    return (
        <div style={estilos}>
            {mensaje}
        </div>
    );
};


export default Notification;