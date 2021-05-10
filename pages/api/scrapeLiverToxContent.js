const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const handler = async (req, res) => {
    const drugName = req.query.input
    // if (!medList.includes(fileName)) {
    //     return
    // }
    try {
        const fetchedData = await fetch(`https://www.ncbi.nlm.nih.gov/books/n/livertox/${drugName}/`,
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
        const hepatotoxicityParagraphs = dom.window.document.getElementById(`${drugName}.Hepatotoxicity`)?.querySelectorAll("p")
        const paragraphText = Object.values(hepatotoxicityParagraphs).map(i => i.textContent).join(" ")
        const json = { hepatotoxicity: paragraphText }
        const response = await res.status(200).send(JSON.stringify(json))
    } catch (e) {
        console.log(e)
    }
}

export default handler