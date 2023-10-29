import React from 'react';

export default function Test() {
    async function onClick() {
        await fetch('/api/updateVoyageTable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.status;
            });
    }


    return <div onClick={onClick}>Test API</div>
}