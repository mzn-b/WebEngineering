package mazen.hcw.webeng.wikipedia

import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.client.RestClient
import org.springframework.web.util.UriComponentsBuilder

@Component
class WikipediaExchange(
    private val restClient: RestClient
) {
    private val baseUrl = "https://en.wikipedia.org/w/api.php"

    fun fetchWikitext(title: String, section: String): String? {
        val uri = UriComponentsBuilder.fromHttpUrl(baseUrl)
            .queryParam("action", "parse")
            .queryParam("page", title)
            .queryParam("prop", "wikitext")
            .queryParam("section", section)
            .queryParam("format", "json")
            .queryParam("origin", "*")
            .build(true)
            .toUri()

        val resp = restClient.get()
            .uri(uri)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .body(ParseResponse::class.java)

        return resp?.parse?.wikitext?.star
    }

    fun fetchImageUrl(fileName: String): String? {
        val normalized = fileName
            .trim()
            .substringBefore("|")
            .trim()
            .replace(Regex("^File:", RegexOption.IGNORE_CASE), "")

        val uri = UriComponentsBuilder.fromHttpUrl(baseUrl)
            .queryParam("action", "query")
            .queryParam("titles", "File:$normalized")
            .queryParam("prop", "imageinfo")
            .queryParam("iiprop", "url")
            .queryParam("format", "json")
            .queryParam("origin", "*")
            .build(false)
            .toUri()

        val resp = restClient.get()
            .uri(uri)
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .body(QueryResponse::class.java)

        val firstPage = resp?.query?.pages?.values?.firstOrNull()
        return firstPage?.imageinfo?.firstOrNull()?.url
    }
}
