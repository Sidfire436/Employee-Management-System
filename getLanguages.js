const languages = {
    en: () => import("./languages/en.json").then(r => r.default),
    hi: () => import("./languages/hi.json").then(r => r.default),
}

export const getLanguages = (lang) => {
    return languages[lang]();
}