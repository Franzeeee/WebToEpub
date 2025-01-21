"use strict";

parserFactory.register("fenrirealm.com", () => new FenrirealmParser());

class FenrirealmParser extends Parser{
    constructor() {
        super();
    }

    async getChapterUrls(dom) {
        let menu = dom.querySelector(".grid-chapter");
        return [...menu.querySelectorAll("a")]
            .map(a => this.hyperLinkToChapter(a))
            .reverse();
    }

    hyperLinkToChapter(link) {
        return ({
            sourceUrl:  link.href,
            title: link.querySelector("span").textContent.trim(),
        });
    }

    findContent(dom) {
        return dom.querySelector("#reader-area");
    }

    extractTitleImpl(dom) {
        return dom.querySelector(".main-area > .container h1");
    }

    findCoverImageUrl(dom) {
        return util.getFirstImgSrc(dom, ".main-area > .container");
    }

    getInformationEpubItemChildNodes(dom) {
        return [...dom.querySelectorAll(".synopsis")];
    }
}
