package mazen.hcw.webeng.wikipedia

import org.springframework.stereotype.Service

@Service
class WikipediaService(
    private val exchange: WikipediaExchange
) {
    private val title = "List_of_ursids"
    private val section = "3"

    fun fetchBearData(): List<Bear> {
        val wikitext = exchange.fetchWikitext(title, section).orEmpty()
        return parseBears(wikitext)
    }

    fun fetchImageUrl(fileName: String?): String? {
        if (fileName.isNullOrBlank()) return null
        return try {
            exchange.fetchImageUrl(fileName)
        } catch (_: Exception) {
            null
        }
    }

    fun parseBears(wikitext: String): List<Bear> {
        val speciesTables = wikitext.split("{{Species table/end}}")
        val bears = mutableListOf<Bear>()

        val nameRegex = Regex("""\|name=\[\[(.*?)]]""")
        val binomialRegex = Regex("""\|binomial=(.*?)\n""")
        val imageRegex = Regex("""\|image=(.*?)\n""")

        for (table in speciesTables) {
            val rows = table.split("{{Species table/row")
            for (row in rows) {
                val name = nameRegex.find(row)?.groupValues?.getOrNull(1)
                val binomial = binomialRegex.find(row)?.groupValues?.getOrNull(1)
                val image = imageRegex.find(row)?.groupValues?.getOrNull(1)

                if (name != null && binomial != null && image != null) {
                    val fileName = image.trim().replace(Regex("^File:", RegexOption.IGNORE_CASE), "")
                    bears += Bear(
                        name = name,
                        binomial = binomial,
                        fileName = fileName,
                        range = "TODO extract correct range"
                    )
                }
            }
        }

        return bears
    }
}
