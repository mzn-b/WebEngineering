package mazen.hcw.webeng.wikipedia

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/wiki")
class WikipediaController(
    private val service: WikipediaService
) {

    @GetMapping("/bears")
    fun bears(): List<Bear> =
        service.fetchBearData()

    @GetMapping("/image-url")
    fun imageUrl(@RequestParam fileName: String?): Map<String, String?> =
        mapOf("url" to service.fetchImageUrl(fileName))
}
