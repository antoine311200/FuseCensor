/*
 * This class provides a way to add interactivity to a text content element (p, a, li...) 
 * by creating a spoiler tag around specific parts of the text
 */
class Spoiler {

    /**
     * Spoiler constructor
     * @param element The HTML Element we want to link
     * @param textlist The list of strings inside the text content of the element that will be change in spoiler
     */
    constructor(element, textlist) {
        this.element = element;
        this.content = this.element.textContent;
        this.rawcontent = this.element.textContent;
        this.textlist = textlist;
    }

    /**
     * A method to enable the hidding of the text
     * @param textlist The list of strings inside the text content of the element that will be change in spoiler
     */
    spoil(textlist) {
        if (textlist !== undefined) {
            this.textlist = textlist;
        }

        let cut = [];
        let currentContent = this.content;
        currentContent = currentContent.replaceAll('[', ' ');
        currentContent = currentContent.replaceAll(']', ' ');
        currentContent = currentContent.replaceAll(')', ' ');
        currentContent = currentContent.replaceAll('(', ' ');
        currentContent = currentContent.replaceAll('"', ' ');

        /*
         * For each string in the list we split the text content in three blocks (the previous text, the text to hide and the remaining text)
         * Then, we had both the former and reprocess on the remaining one in an iterative way until we've reach the end of the text content.
         */
        for (let i in this.textlist) {
            try {
                this.textlist[i] = this.textlist[i].replaceAll('[', ' ');
                this.textlist[i] = this.textlist[i].replaceAll(']', ' ');
                this.textlist[i] = this.textlist[i].replaceAll(')', ' ');
                this.textlist[i] = this.textlist[i].replaceAll('(', ' ');
                this.textlist[i] = this.textlist[i].replaceAll('"', ' ');
                const regexp = new RegExp(`(.*)(${this.textlist[i]})(.*)`, 'g');
                const matched = regexp.exec(currentContent);
                if (matched != null) {
                    cut.push(matched[1]);
                    cut.push(matched[2]);
                    currentContent = matched[3];
                }
            } catch {
                let n = currentContent.indexOf(this.textlist[i]) + this.textlist[i].length;
                currentContent = currentContent.substring(n)
            }
        }
        cut.push(currentContent);

        try {
            this.content = this.content.split(this.textlist[0]);
            this.content.splice(1, 0, this.textlist[0]);
        } catch { }

        let id = 0;
        this.element.textContent = "";
        for (let part of cut) {
            const span = document.createElement("SPAN");
            const textnode = document.createTextNode(part);

            if (this.textlist != null && this.textlist.includes(part)) {
                span.className = "spoiler-default"+' '+settings.theme;
                id += 1;
            }
            span.appendChild(textnode);
            span.addEventListener('click', () => {
                if (span.className === "spoiler-default"+' '+settings.theme) {
                    span.className = "spoiler-active"+' '+settings.theme;
                }
                else if (span.className === "spoiler-active"+' '+settings.theme) {
                    span.className = "spoiler-default"+' '+settings.theme;
                }
            });
            this.element.appendChild(span);
        }
    }

    /**
     * A method to disable the hidding of the text
     */
    unspoil() {
        this.element.textContent = this.rawcontent;
        this.content = this.rawcontent;
    }
}