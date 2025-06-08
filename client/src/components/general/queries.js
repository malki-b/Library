export async function GET(url) {
    const res = await fetch(url);
    if (!res.ok) {
        const response = await res.json()
        throw new Error(response.error);
    }
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
        const response = await res.json()
        throw new Error(response.error);
    }
    return await res.json();
}

export async function DELETE(url) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        const response = await res.json()
        throw new Error(response.error);
    }

    return await res.json();

}

export async function POST(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const response = await res.json()
        throw new Error(response.error);
    }
    const responseData = await res.json();
    return responseData;

}