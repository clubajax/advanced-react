const BaseComponent = require('BaseComponent');

class Icon extends BaseComponent {
	get templateString () {
		return `
<?xml version="1.0" ?>
<!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
<svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17,17.25V14H10V10H17V6.75L22.25,12L17,17.25M13,2A2,2 0 0,1 15,4V8H13V4H4V20H13V16H15V20A2,2 0 0,1 13,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2H13Z" />
</svg>
`;
	}
}


customElements.define('icon-logout', Icon);

module.exports = Icon;
