const getApiBaseUrl = () => {
    if (window.FOOD_API_BASE_URL) {
        return window.FOOD_API_BASE_URL.replace(/\/+$/, '');
    }

    if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
        return 'http://127.0.0.1:3000';
    }

    return '';
};

const readJson = async (response) => {
    let data;
    try {
        data = await response.json();
    } catch {
        throw new Error(`The server returned an unreadable response (${response.status}).`);
    }

    if (!response.ok) {
        throw new Error(data?.message || `Request failed (${response.status}).`);
    }

    return data;
};

const getResource = async (resource) => {
    const apiBaseUrl = getApiBaseUrl();
    if (apiBaseUrl) {
        try {
            const response = await fetch(new URL(resource, `${apiBaseUrl}/`));
            return await readJson(response);
        } catch (error) {
            if (resource !== 'menu') {
                throw error;
            }
        }
    }

    const response = await fetch(new URL('db.json', document.baseURI));
    const data = await readJson(response);
    if (!Array.isArray(data?.[resource])) {
        throw new Error(`The static demo data does not contain "${resource}".`);
    }
    return data[resource];
};

const postData = async (resource, data) => {
    const apiBaseUrl = getApiBaseUrl();
    if (!apiBaseUrl) {
        throw new Error('Requests are disabled in the static preview.');
    }

    const response = await fetch(new URL(resource, `${apiBaseUrl}/`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
    });

    return readJson(response);
};

export { getApiBaseUrl, getResource, postData };
