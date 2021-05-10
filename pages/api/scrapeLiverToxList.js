const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const handler = async (req, res) => {
    try {
        const fetchedData = await fetch(`https://www.ncbi.nlm.nih.gov/books/NBK547852/`,
            {
                method: "GET",
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
                    Accept: "application/json; charset=UTF-8",
                },
            })
        const html = await fetchedData.text()
        const dom = new JSDOM(html);
        const drugList = dom.window.document.querySelectorAll(".toc-item")
        const drugNamesUrls = Object.values(drugList).map(i => {
            return { name: i.textContent, href: `https://www.ncbi.nlm.nih.gov${i.href}` }
        })
        const json = drugNamesUrls
        const response = await res.status(200).send(JSON.stringify(json))
    } catch (e) {
        console.log(e)
    }
}

export default handler