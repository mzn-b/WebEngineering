package mazen.hcw.webeng.wikipedia

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty

@JsonIgnoreProperties(ignoreUnknown = true)
data class ParseResponse(
    val parse: Parse? = null
) {
    @JsonIgnoreProperties(ignoreUnknown = true)
    data class Parse(
        val wikitext: Wikitext? = null
    )

    @JsonIgnoreProperties(ignoreUnknown = true)
    data class Wikitext(
        @JsonProperty("*")
        val star: String? = null
    )
}
