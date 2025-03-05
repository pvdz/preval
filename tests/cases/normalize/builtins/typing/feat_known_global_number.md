# Preval test case

# feat_known_global_number.md

> Normalize > Builtins > Typing > Feat known global number
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

## Input

`````js filename=intro
$(typeof isNaN($spy('isNaN')));
$(typeof isFinite($spy('isFinite')));
$(typeof Number.isFinite($spy('Number.isFinite')));
$(typeof Number.isInteger($spy('Number.isInteger')));
$(typeof Number.isNaN($spy('Number.isNaN')));
$(typeof Number.isSafeInteger($spy('Number.isSafeInteger')));
$(typeof Number.parseFloat($spy('Number.parseFloat')));
$(typeof Number.parseInt($spy('Number.parseInt')));
$(typeof Number.EPSILON, 'Number.EPSILON');
$(typeof Number.MAX_VALUE, 'Number.MAX_VALUE');
$(typeof Number.MIN_VALUE, 'Number.MIN_VALUE');
$(typeof Number.NEGATIVE_INFINITY, 'Number.NEGATIVE_INFINITY');
$(typeof Number.POSITIVE_INFINITY, 'Number.POSITIVE_INFINITY');
$(typeof Number.NaN, 'Number.NaN');
`````

## Pre Normal


`````js filename=intro
$(typeof isNaN($spy(`isNaN`)));
$(typeof isFinite($spy(`isFinite`)));
$(typeof Number.isFinite($spy(`Number.isFinite`)));
$(typeof Number.isInteger($spy(`Number.isInteger`)));
$(typeof Number.isNaN($spy(`Number.isNaN`)));
$(typeof Number.isSafeInteger($spy(`Number.isSafeInteger`)));
$(typeof Number.parseFloat($spy(`Number.parseFloat`)));
$(typeof Number.parseInt($spy(`Number.parseInt`)));
$(typeof Number.EPSILON, `Number.EPSILON`);
$(typeof Number.MAX_VALUE, `Number.MAX_VALUE`);
$(typeof Number.MIN_VALUE, `Number.MIN_VALUE`);
$(typeof Number.NEGATIVE_INFINITY, `Number.NEGATIVE_INFINITY`);
$(typeof Number.POSITIVE_INFINITY, `Number.POSITIVE_INFINITY`);
$(typeof Number.NaN, `Number.NaN`);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = $spy(`isNaN`);
const tmpUnaryArg = isNaN(tmpCalleeParam$1);
const tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
const tmpCalleeParam$5 = $spy(`isFinite`);
const tmpUnaryArg$1 = isFinite(tmpCalleeParam$5);
const tmpCalleeParam$3 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$3);
const tmpCalleeParam$9 = $spy(`Number.isFinite`);
const tmpUnaryArg$3 = $Number_isFinite(tmpCalleeParam$9);
const tmpCalleeParam$7 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$7);
const tmpCalleeParam$13 = $spy(`Number.isInteger`);
const tmpUnaryArg$5 = $Number_isInteger(tmpCalleeParam$13);
const tmpCalleeParam$11 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$11);
const tmpCalleeParam$17 = $spy(`Number.isNaN`);
const tmpUnaryArg$7 = $Number_isNaN(tmpCalleeParam$17);
const tmpCalleeParam$15 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$15);
const tmpCalleeParam$21 = $spy(`Number.isSafeInteger`);
const tmpUnaryArg$9 = $Number_isSafeInteger(tmpCalleeParam$21);
const tmpCalleeParam$19 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$19);
const tmpCalleeParam$25 = $spy(`Number.parseFloat`);
const tmpUnaryArg$11 = $Number_parseFloat(tmpCalleeParam$25);
const tmpCalleeParam$23 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$23);
const tmpCalleeParam$29 = $spy(`Number.parseInt`);
const tmpUnaryArg$13 = $Number_parseInt(tmpCalleeParam$29);
const tmpCalleeParam$27 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$27);
const tmpUnaryArg$15 = $Number_EPSILON;
const tmpCalleeParam$31 = typeof tmpUnaryArg$15;
$(tmpCalleeParam$31, `Number.EPSILON`);
const tmpUnaryArg$17 = $Number_MAX_VALUE;
const tmpCalleeParam$33 = typeof tmpUnaryArg$17;
$(tmpCalleeParam$33, `Number.MAX_VALUE`);
const tmpUnaryArg$19 = $Number_MIN_VALUE;
const tmpCalleeParam$35 = typeof tmpUnaryArg$19;
$(tmpCalleeParam$35, `Number.MIN_VALUE`);
const tmpUnaryArg$21 = -Infinity;
const tmpCalleeParam$37 = typeof tmpUnaryArg$21;
$(tmpCalleeParam$37, `Number.NEGATIVE_INFINITY`);
const tmpUnaryArg$23 = Infinity;
const tmpCalleeParam$39 = typeof tmpUnaryArg$23;
$(tmpCalleeParam$39, `Number.POSITIVE_INFINITY`);
const tmpUnaryArg$25 = NaN;
const tmpCalleeParam$41 = typeof tmpUnaryArg$25;
$(tmpCalleeParam$41, `Number.NaN`);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $spy(`isNaN`);
$coerce(tmpCalleeParam$1, `number`);
$(`boolean`);
const tmpCalleeParam$5 /*:unknown*/ = $spy(`isFinite`);
$coerce(tmpCalleeParam$5, `number`);
$(`boolean`);
$spy(`Number.isFinite`);
$(`boolean`);
$spy(`Number.isInteger`);
$(`boolean`);
$spy(`Number.isNaN`);
$(`boolean`);
$spy(`Number.isSafeInteger`);
$(`boolean`);
const tmpCalleeParam$25 /*:unknown*/ = $spy(`Number.parseFloat`);
$coerce(tmpCalleeParam$25, `string`);
$(`number`);
const tmpCalleeParam$29 /*:unknown*/ = $spy(`Number.parseInt`);
$coerce(tmpCalleeParam$29, `string`);
$(`number`);
$(`number`, `Number.EPSILON`);
$(`number`, `Number.MAX_VALUE`);
$(`number`, `Number.MIN_VALUE`);
$(`number`, `Number.NEGATIVE_INFINITY`);
$(`number`, `Number.POSITIVE_INFINITY`);
$(`number`, `Number.NaN`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( "isNaN" );
$coerce( a, "number" );
$( "boolean" );
const b = $spy( "isFinite" );
$coerce( b, "number" );
$( "boolean" );
$spy( "Number.isFinite" );
$( "boolean" );
$spy( "Number.isInteger" );
$( "boolean" );
$spy( "Number.isNaN" );
$( "boolean" );
$spy( "Number.isSafeInteger" );
$( "boolean" );
const c = $spy( "Number.parseFloat" );
$coerce( c, "string" );
$( "number" );
const d = $spy( "Number.parseInt" );
$coerce( d, "string" );
$( "number" );
$( "number", "Number.EPSILON" );
$( "number", "Number.MAX_VALUE" );
$( "number", "Number.MIN_VALUE" );
$( "number", "Number.NEGATIVE_INFINITY" );
$( "number", "Number.POSITIVE_INFINITY" );
$( "number", "Number.NaN" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['isNaN', 'isNaN']
 - 2: '$spy[1].valueOf()', 'isNaN'
 - 3: 'boolean'
 - 4: 'Creating spy', 2, 1, ['isFinite', 'isFinite']
 - 5: '$spy[2].valueOf()', 'isFinite'
 - 6: 'boolean'
 - 7: 'Creating spy', 3, 1, ['Number.isFinite', 'Number.isFinite']
 - 8: 'boolean'
 - 9: 'Creating spy', 4, 1, ['Number.isInteger', 'Number.isInteger']
 - 10: 'boolean'
 - 11: 'Creating spy', 5, 1, ['Number.isNaN', 'Number.isNaN']
 - 12: 'boolean'
 - 13: 'Creating spy', 6, 1, ['Number.isSafeInteger', 'Number.isSafeInteger']
 - 14: 'boolean'
 - 15: 'Creating spy', 7, 1, ['Number.parseFloat', 'Number.parseFloat']
 - 16: '$spy[7].toString()', 'Number.parseFloat'
 - 17: 'number'
 - 18: 'Creating spy', 8, 1, ['Number.parseInt', 'Number.parseInt']
 - 19: '$spy[8].toString()', 'Number.parseInt'
 - 20: 'number'
 - 21: 'number', 'Number.EPSILON'
 - 22: 'number', 'Number.MAX_VALUE'
 - 23: 'number', 'Number.MIN_VALUE'
 - 24: 'number', 'Number.NEGATIVE_INFINITY'
 - 25: 'number', 'Number.POSITIVE_INFINITY'
 - 26: 'number', 'Number.NaN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
