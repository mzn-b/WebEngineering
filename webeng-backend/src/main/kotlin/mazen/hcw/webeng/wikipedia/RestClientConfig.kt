package mazen.hcw.webeng.wikipedia

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.web.client.RestClient

@Configuration
class RestClientConfig {

    @Bean
    fun restClient(): RestClient =
        RestClient.builder()
            .defaultHeader(
                HttpHeaders.USER_AGENT,
            "BearWikiApp/1.0 (https://example.com; contact: youremail@example.com) SpringBoot")
            .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
            .build()
}
