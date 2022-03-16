#!/usr/bin/env node
import meow from 'meow';

const cli = meow(`
	Usage
	  $ foo

	Options
	  --rainbow, -r  Include a rainbow
	  --unicorn, -u  Include a unicorn
	  --no-sparkles  Exclude sparkles

	Examples
	  $ foo
	  🌈 unicorns✨🌈
`, {
	importMeta: import.meta,
	booleanDefault: undefined,
	flags: {
		rainbow: {
			type: 'boolean',
			default: true,
			alias: 'r'
		},
		unicorn: {
			type: 'boolean',
			default: false,
			alias: 'u'
		},
		cake: {
			type: 'boolean',
			alias: 'c'
		},
		sparkles: {
			type: 'boolean',
			default: true
		}
	}
});
/*
{
	flags: {
		rainbow: true,
		unicorn: false,
		sparkles: true
	},
	unnormalizedFlags: {
		rainbow: true,
		r: true,
		unicorn: false,
		u: false,
		sparkles: true
	},
	…
}
*/

export default cli;