export async function GET(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network error");
    return await res.json();
}

export async function PUT(url, data) {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data), 
    });
    if (!res.ok) {
        console.error("Network error:", res.status, res.statusText);
        throw new Error("Network error");
    }
    return await res.json();
}

export async function DELETE(url) {
    try {
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.error("Network error:", res.status, res.statusText);
            throw new Error("Failed to delete resource");
        }

        return await res.json();
    } catch (error) {
        console.error('Error in DELETE request:', error);
        throw error;
    }
}

export async function POST(url, data) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            console.error("Network error:", res.status, res.statusText);
            throw new Error("Failed to create resource");
        }
        const responseData = await res.json();
        return responseData;
    } catch (error) {
        console.error('Error in POST request:', error);
        throw error;
    }
}