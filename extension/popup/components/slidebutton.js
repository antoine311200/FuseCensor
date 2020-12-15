/**
 * Class for giving interactivity to a slidebutton template (i.e enable/disable button)
 */
class SlideButton {

    /**
     * SlideButton constructor
     * @param classname  The class name of the template 
     * @param toggle  A boolean wether the button is enabled or not 
     */
    constructor(classname, toggle) {
        this.classname = classname;
        this.element = $(`.${this.classname}`);
        this.toggle = toggle;

        this.element.find('input').attr("checked", this.toggle);
    }

    /**
     * Adding event listener on the button on click to trigger the toggle
     */
    run() {
        this.element.find('input').on('click', () => {
            this.toggle = !this.toggle;
            console.log(this.toggle);
        });
    }

    /**
     * Update the button by setting the toggle
     * @param toggle  A boolean wether the button is enabled or not 
     */
    update(toggle) {
        this.toggle = toggle;
        console.log('toggle', this.toggle);
        this.element.find('input').attr("checked", this.toggle);
    }
}