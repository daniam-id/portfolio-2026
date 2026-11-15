/** Prefixes a file in public/ with the deploy base, so the site works at / and at /repo-name/. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
