/** @type {import('./$types').PageLoad} */
export async function load({ fetch, setHeaders }) {
    setHeaders({
            'Access-Control-Allow-Origin': '*'
    });
}
