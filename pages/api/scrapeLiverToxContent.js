const cheerio = require('cheerio')

const handler = async (req, res) => {
    const drugName = req.query.input
    const drugHref = req.query.href
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
        const $ = cheerio.load(html)
        const list = []
        $(`div[id="${drugName}.Hepatotoxicity"]`)
            .find('p').each(function (index, element) {
                list.push($(element).text())
            })
        const hepatotoxicityParagraphs = list.join(" ")
        if (hepatotoxicityParagraphs) {
            const json = { drugName: drugName, hepatotoxicity: hepatotoxicityParagraphs }
            await res.status(200).send(JSON.stringify(json))
        }

        if (!hepatotoxicityParagraphs) {
            const json = { hepatotoxicity: `Hepatotoxicity not found. Please visit <u><a href="https://www.ncbi.nlm.nih.gov${drugHref}/">LiverTox</a></u> for more information` }
            await res.status(200).send(JSON.stringify(json))
        }
    } catch (e) {
        console.log(e)
    }
}

export default handler