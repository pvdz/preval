# Preval test case

# feat_known_global_math2.md

> Normalize > Builtins > Typing > Feat known global math2
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

## Input

`````js filename=intro
$(typeof Math.cos($spy('Math.cos')));
$(typeof Math.cosh($spy('Math.cosh')));
$(typeof Math.exp($spy('Math.exp')));
$(typeof Math.expm1($spy('Math.expm1')));
$(typeof Math.floor($spy('Math.floor')));
$(typeof Math.fround($spy('Math.fround')));
$(typeof Math.imul($spy('Math.imul')));
$(typeof Math.log($spy('Math.log')));
`````

## Pre Normal


`````js filename=intro
$(typeof Math.cos($spy(`Math.cos`)));
$(typeof Math.cosh($spy(`Math.cosh`)));
$(typeof Math.exp($spy(`Math.exp`)));
$(typeof Math.expm1($spy(`Math.expm1`)));
$(typeof Math.floor($spy(`Math.floor`)));
$(typeof Math.fround($spy(`Math.fround`)));
$(typeof Math.imul($spy(`Math.imul`)));
$(typeof Math.log($spy(`Math.log`)));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam$1 = $spy(`Math.cos`);
const tmpUnaryArg = $Math_cos(tmpCalleeParam$1);
const tmpCalleeParam = typeof tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$5 = $spy(`Math.cosh`);
const tmpUnaryArg$1 = $Math_cosh(tmpCalleeParam$5);
const tmpCalleeParam$3 = typeof tmpUnaryArg$1;
tmpCallCallee$1(tmpCalleeParam$3);
const tmpCallCallee$3 = $;
const tmpCalleeParam$9 = $spy(`Math.exp`);
const tmpUnaryArg$3 = $Math_exp(tmpCalleeParam$9);
const tmpCalleeParam$7 = typeof tmpUnaryArg$3;
tmpCallCallee$3(tmpCalleeParam$7);
const tmpCallCallee$5 = $;
const tmpCalleeParam$13 = $spy(`Math.expm1`);
const tmpUnaryArg$5 = $Math_expm1(tmpCalleeParam$13);
const tmpCalleeParam$11 = typeof tmpUnaryArg$5;
tmpCallCallee$5(tmpCalleeParam$11);
const tmpCallCallee$7 = $;
const tmpCalleeParam$17 = $spy(`Math.floor`);
const tmpUnaryArg$7 = $Math_floor(tmpCalleeParam$17);
const tmpCalleeParam$15 = typeof tmpUnaryArg$7;
tmpCallCallee$7(tmpCalleeParam$15);
const tmpCallCallee$9 = $;
const tmpCalleeParam$21 = $spy(`Math.fround`);
const tmpUnaryArg$9 = $Math_fround(tmpCalleeParam$21);
const tmpCalleeParam$19 = typeof tmpUnaryArg$9;
tmpCallCallee$9(tmpCalleeParam$19);
const tmpCallCallee$11 = $;
const tmpCalleeParam$25 = $spy(`Math.imul`);
const tmpUnaryArg$11 = $Math_imul(tmpCalleeParam$25);
const tmpCalleeParam$23 = typeof tmpUnaryArg$11;
tmpCallCallee$11(tmpCalleeParam$23);
const tmpCallCallee$13 = $;
const tmpCalleeParam$29 = $spy(`Math.log`);
const tmpUnaryArg$13 = $Math_log(tmpCalleeParam$29);
const tmpCalleeParam$27 = typeof tmpUnaryArg$13;
tmpCallCallee$13(tmpCalleeParam$27);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $spy(`Math.cos`);
$coerce(tmpCalleeParam$1, `number`);
$(`number`);
const tmpCalleeParam$5 /*:unknown*/ = $spy(`Math.cosh`);
$coerce(tmpCalleeParam$5, `number`);
$(`number`);
const tmpCalleeParam$9 /*:unknown*/ = $spy(`Math.exp`);
$coerce(tmpCalleeParam$9, `number`);
$(`number`);
const tmpCalleeParam$13 /*:unknown*/ = $spy(`Math.expm1`);
$coerce(tmpCalleeParam$13, `number`);
$(`number`);
const tmpCalleeParam$17 /*:unknown*/ = $spy(`Math.floor`);
$coerce(tmpCalleeParam$17, `number`);
$(`number`);
const tmpCalleeParam$21 /*:unknown*/ = $spy(`Math.fround`);
$coerce(tmpCalleeParam$21, `number`);
$(`number`);
const tmpCalleeParam$25 /*:unknown*/ = $spy(`Math.imul`);
+tmpCalleeParam$25;
$(`number`);
const tmpCalleeParam$29 /*:unknown*/ = $spy(`Math.log`);
$coerce(tmpCalleeParam$29, `number`);
$(`number`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( "Math.cos" );
$coerce( a, "number" );
$( "number" );
const b = $spy( "Math.cosh" );
$coerce( b, "number" );
$( "number" );
const c = $spy( "Math.exp" );
$coerce( c, "number" );
$( "number" );
const d = $spy( "Math.expm1" );
$coerce( d, "number" );
$( "number" );
const e = $spy( "Math.floor" );
$coerce( e, "number" );
$( "number" );
const f = $spy( "Math.fround" );
$coerce( f, "number" );
$( "number" );
const g = $spy( "Math.imul" );
+g;
$( "number" );
const h = $spy( "Math.log" );
$coerce( h, "number" );
$( "number" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['Math.cos', 'Math.cos']
 - 2: '$spy[1].valueOf()', 'Math.cos'
 - 3: 'number'
 - 4: 'Creating spy', 2, 1, ['Math.cosh', 'Math.cosh']
 - 5: '$spy[2].valueOf()', 'Math.cosh'
 - 6: 'number'
 - 7: 'Creating spy', 3, 1, ['Math.exp', 'Math.exp']
 - 8: '$spy[3].valueOf()', 'Math.exp'
 - 9: 'number'
 - 10: 'Creating spy', 4, 1, ['Math.expm1', 'Math.expm1']
 - 11: '$spy[4].valueOf()', 'Math.expm1'
 - 12: 'number'
 - 13: 'Creating spy', 5, 1, ['Math.floor', 'Math.floor']
 - 14: '$spy[5].valueOf()', 'Math.floor'
 - 15: 'number'
 - 16: 'Creating spy', 6, 1, ['Math.fround', 'Math.fround']
 - 17: '$spy[6].valueOf()', 'Math.fround'
 - 18: 'number'
 - 19: 'Creating spy', 7, 1, ['Math.imul', 'Math.imul']
 - 20: '$spy[7].valueOf()', 'Math.imul'
 - 21: 'number'
 - 22: 'Creating spy', 8, 1, ['Math.log', 'Math.log']
 - 23: '$spy[8].valueOf()', 'Math.log'
 - 24: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
