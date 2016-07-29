import $ from 'jquery';

/**
 * Button
 *
 * @param {Object} [props]
 * @param {String} [props.type='button']
 * @param {String} [props.text]
 * @param {Function} [props.onClick]
 */
const Button = function (props = {}) {
	this._$block = null;
	this._type = props.type || 'button';
	this._text = props.text || '';
	this._onClick = props.onClick;
};

/**
 * Initialize
 *
 * @public
 */
Button.prototype.initialize = function () {
	const $block = this._$block = $(`<button type="${this._type}">${this._text}</button>`);
	if (this._onClick) {
		$block.on('click', this._onClick.bind(this));
	}
};

/**
 * Returns the button block
 *
 * @returns {jQuery}
 * @public
 */
Button.prototype.getBlock = function () {
	return this._$block;
};

/**
 * Set button text
 *
 * @param {String} text
 * @public
 */
Button.prototype.setText = function (text) {
	this._$block.html(text);
};

export default Button;
