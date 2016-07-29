/* global document */

import $ from 'jquery';
import Button from './button.js';

$(function () {
	const button = new Button({
		text: 'Hello World!',
		onClick: function () {
			this.setText(reverseString(this._$block.text()));
		}
	});
	button.initialize();

	$(document.body).append(button.getBlock());
});

/**
 * Returns reversed string
 *
 * @param {String} string
 * @returns {String}
 */
function reverseString(string) {
	return string.split('').reverse().join('');
}
