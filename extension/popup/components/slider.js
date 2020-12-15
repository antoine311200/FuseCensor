/**
 * Class for giving interactivity to a slider template
 */

class Slider {

    /**
     * Some style 
     */
    static thumbStyle = `
        width: 18px;
        height: 1px;
        margin: -8px 0  0;
        border-radius: 50%;
        cursor: pointer;
        border: 0 !important;`;
    static prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
    
    /**
     * SlideButton constructor
     * @param classname  The class name of the template 
     * @param color  Specify the color of the active part of the slider 
     */
    constructor(classname, color) {
        this.classname = classname;
        this.container = $(`.${this.classname}`);
        this.input = this.container.find('.range input');
        this.labels = this.container.find('.range-labels');
        this.lis = this.labels.find('li');
        this.slide = this.container.find('.range .active-slide');

        this.color = (color != null) ? color : '#37adbf';

        this.value = $(this.input)[0].value;

        this.sheet = document.createElement('style');
        document.body.appendChild(this.sheet);
    }

    /**
     * Setup the event listeners on input and click
     */
    run() {
        const _this = this;
        this.input.on('input', () => {
            this.set($(this.input)[0].value);
            this.value = $(this.input)[0].value;
        });
        this.lis.on('click', function () {
            let index = $(this).index();
            _this.input.val(index+1).trigger('input');
            this.value = index;
        });

        this.sheet.textContent += `.${this.classname} .range-labels li.active { color: ${this.color}; }`;
        this.sheet.textContent += `.${this.classname} .range-labels li.selected::before { background: ${this.color}; }`;
    }

    /**
     * Set a new value for the slider 
     * @param currentValue  The new value
     */
    set(currentValue) {
        const value = (currentValue-1)*25;
        let style = '';
  
        // Set active label
        this.lis.removeClass('active selected');
        
        let currentLabel = this.labels.find(`li:nth-child(${currentValue})`);
        currentLabel.addClass('active selected');
        currentLabel.prevAll().addClass('selected');

        // Change background gradient
        for (var i = 0; i < Slider.prefs.length; i++) {
            style += `.${this.classname} .range .active-slide {background: linear-gradient(to right, ${this.color} 0%, ${this.color} ${value}%, rgb(180, 180, 180) ${value}%, rgb(180, 180, 180) 100%)}`;
        }
        this.sheet.textContent += style;
    }
}