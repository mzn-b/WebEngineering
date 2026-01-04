package mazen.hcw.webeng.wikipedia

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
data class QueryResponse(
    val query: Query? = null
) {
    @JsonIgnoreProperties(ignoreUnknown = true)
    data class Query(
        val pages: Map<String, WikiPage>? = null
    )

    @JsonIgnoreProperties(ignoreUnknown = true)
    data class WikiPage(
        val imageinfo: List<ImageInfo>? = null
    )

    @JsonIgnoreProperties(ignoreUnknown = true)
    data class ImageInfo(
        val url: String? = null
    )
}
