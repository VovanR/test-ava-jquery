import test from 'ava';
import jsdom from 'jsdom';
let jQuery = null;
let Component = null;

test.beforeEach(() => {
	global.document = jsdom.jsdom();
	global.window = global.document.defaultView;
	jQuery = require('jquery');
	Component = require('../src/js/button.js');
});

test.afterEach(() => {
	delete global.document;
	delete global.window;
});

test('initialize', t => {
	const c = new Component();
	t.falsy(c._$block);
	c.initialize();
	t.truthy(c._$block);
});

test('getBlock', t => {
	const c = new Component();
	t.is(c.getBlock(), null);
	c.initialize();
	t.true(c.getBlock() instanceof jQuery);
});

test('setText', t => {
	const c = new Component();
	c.initialize();
	t.is(c.getBlock().text(), '');
	c.setText('foo');
	t.is(c.getBlock().text(), 'foo');
});

test('onClick', t => {
	let isFired = false;
	const c = new Component({
		onClick: function () {
			isFired = true;
		}
	});
	c.initialize();
	const $block = c.getBlock();
	t.false(isFired);
	$block.trigger('click');
	t.true(isFired);
});
