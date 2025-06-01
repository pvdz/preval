# Preval test case

# ai_math_methods_opaque_args.md

> Ai > Ai2 > Ai math methods opaque args
>
> Test: Math object methods (abs, floor, random, etc.) with opaque arguments.

## Input

`````js filename=intro
// Expected: Calls preserved. Math.random() should be recognized as potentially impure but stable if seeded.
let num1 = $('math_num1', -5.5);
let num2 = $('math_num2', 10);
let opaque_num = $('math_opaque_num');

$('math_abs', Math.abs(num1));
$('math_floor', Math.floor(num1));
$('math_ceil', Math.ceil(num1));
$('math_round', Math.round(num1));
$('math_pow', Math.pow(num2, $('math_power', 2)));
$('math_sqrt', Math.sqrt(num2));
$('math_random', Math.random()); // Preval should handle this (fixed seed for testing)

$('math_abs_opaque', Math.abs(opaque_num));
$('math_floor_opaque', Math.floor(opaque_num));
$('math_max_opaque', Math.max(num1, opaque_num, num2));
$('math_min_opaque', Math.min($('math_min_arg1'), opaque_num));
`````


## Settled


`````js filename=intro
const num1 /*:unknown*/ = $(`math_num1`, -5.5);
const num2 /*:unknown*/ = $(`math_num2`, 10);
const opaque_num /*:unknown*/ = $(`math_opaque_num`);
const tmpCalleeParam /*:number*/ = $Math_abs(num1);
$(`math_abs`, tmpCalleeParam);
const tmpCalleeParam$1 /*:number*/ = $Math_floor(num1);
$(`math_floor`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:number*/ = $Math_ceil(num1);
$(`math_ceil`, tmpCalleeParam$3);
const tmpCalleeParam$5 /*:number*/ = $Math_round(num1);
$(`math_round`, tmpCalleeParam$5);
const tmpMCP /*:unknown*/ = $(`math_power`, 2);
const tmpCalleeParam$7 /*:number*/ = $Math_pow(num2, tmpMCP);
$(`math_pow`, tmpCalleeParam$7);
const tmpCalleeParam$9 /*:number*/ = $Math_sqrt(num2);
$(`math_sqrt`, tmpCalleeParam$9);
$(`math_random`, 0.12556649118791485);
const tmpCalleeParam$13 /*:number*/ = $Math_abs(opaque_num);
$(`math_abs_opaque`, tmpCalleeParam$13);
const tmpCalleeParam$15 /*:number*/ = $Math_floor(opaque_num);
$(`math_floor_opaque`, tmpCalleeParam$15);
const tmpCalleeParam$17 /*:number*/ = $Math_max(num1, opaque_num, num2);
$(`math_max_opaque`, tmpCalleeParam$17);
const tmpMCP$1 /*:unknown*/ = $(`math_min_arg1`);
const tmpCalleeParam$19 /*:number*/ = $Math_min(tmpMCP$1, opaque_num);
$(`math_min_opaque`, tmpCalleeParam$19);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num1 = $(`math_num1`, -5.5);
const num2 = $(`math_num2`, 10);
const opaque_num = $(`math_opaque_num`);
$(`math_abs`, $Math_abs(num1));
$(`math_floor`, $Math_floor(num1));
$(`math_ceil`, $Math_ceil(num1));
$(`math_round`, $Math_round(num1));
$(`math_pow`, $Math_pow(num2, $(`math_power`, 2)));
$(`math_sqrt`, $Math_sqrt(num2));
$(`math_random`, 0.12556649118791485);
$(`math_abs_opaque`, $Math_abs(opaque_num));
$(`math_floor_opaque`, $Math_floor(opaque_num));
$(`math_max_opaque`, $Math_max(num1, opaque_num, num2));
$(`math_min_opaque`, $Math_min($(`math_min_arg1`), opaque_num));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "math_num1", -5.5 );
const b = $( "math_num2", 10 );
const c = $( "math_opaque_num" );
const d = $Math_abs( a );
$( "math_abs", d );
const e = $Math_floor( a );
$( "math_floor", e );
const f = $Math_ceil( a );
$( "math_ceil", f );
const g = $Math_round( a );
$( "math_round", g );
const h = $( "math_power", 2 );
const i = $Math_pow( b, h );
$( "math_pow", i );
const j = $Math_sqrt( b );
$( "math_sqrt", j );
$( "math_random", 0.12556649118791485 );
const k = $Math_abs( c );
$( "math_abs_opaque", k );
const l = $Math_floor( c );
$( "math_floor_opaque", l );
const m = $Math_max( a, c, b );
$( "math_max_opaque", m );
const n = $( "math_min_arg1" );
const o = $Math_min( n, c );
$( "math_min_opaque", o );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let num1 = $(`math_num1`, -5.5);
let num2 = $(`math_num2`, 10);
let opaque_num = $(`math_opaque_num`);
const tmpMCF = $Math_abs;
let tmpCalleeParam = $Math_abs(num1);
$(`math_abs`, tmpCalleeParam);
const tmpMCF$1 = $Math_floor;
let tmpCalleeParam$1 = $Math_floor(num1);
$(`math_floor`, tmpCalleeParam$1);
const tmpMCF$3 = $Math_ceil;
let tmpCalleeParam$3 = $Math_ceil(num1);
$(`math_ceil`, tmpCalleeParam$3);
const tmpMCF$5 = $Math_round;
let tmpCalleeParam$5 = $Math_round(num1);
$(`math_round`, tmpCalleeParam$5);
const tmpMCF$7 = $Math_pow;
const tmpMCP = $(`math_power`, 2);
let tmpCalleeParam$7 = $dotCall(tmpMCF$7, Math, `pow`, num2, tmpMCP);
$(`math_pow`, tmpCalleeParam$7);
const tmpMCF$9 = $Math_sqrt;
let tmpCalleeParam$9 = $Math_sqrt(num2);
$(`math_sqrt`, tmpCalleeParam$9);
const tmpMCF$11 = $Math_random;
let tmpCalleeParam$11 = 0.12556649118791485;
$(`math_random`, tmpCalleeParam$11);
const tmpMCF$13 = $Math_abs;
let tmpCalleeParam$13 = $Math_abs(opaque_num);
$(`math_abs_opaque`, tmpCalleeParam$13);
const tmpMCF$15 = $Math_floor;
let tmpCalleeParam$15 = $Math_floor(opaque_num);
$(`math_floor_opaque`, tmpCalleeParam$15);
const tmpMCF$17 = $Math_max;
let tmpCalleeParam$17 = $Math_max(num1, opaque_num, num2);
$(`math_max_opaque`, tmpCalleeParam$17);
const tmpMCF$19 = $Math_min;
const tmpMCP$1 = $(`math_min_arg1`);
let tmpCalleeParam$19 = $dotCall(tmpMCF$19, Math, `min`, tmpMCP$1, opaque_num);
$(`math_min_opaque`, tmpCalleeParam$19);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_abs
- (todo) type trackeed tricks can possibly support static $Math_ceil
- (todo) type trackeed tricks can possibly support static $Math_floor
- (todo) type trackeed tricks can possibly support static $Math_max
- (todo) type trackeed tricks can possibly support static $Math_min
- (todo) type trackeed tricks can possibly support static $Math_pow
- (todo) type trackeed tricks can possibly support static $Math_round
- (todo) type trackeed tricks can possibly support static $Math_sqrt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'math_num1', -5.5
 - 2: 'math_num2', 10
 - 3: 'math_opaque_num'
 - 4: 'math_abs', NaN
 - 5: 'math_floor', NaN
 - 6: 'math_ceil', NaN
 - 7: 'math_round', NaN
 - 8: 'math_power', 2
 - 9: 'math_pow', NaN
 - 10: 'math_sqrt', NaN
 - 11: 'math_random', 0.12556649118791485
 - 12: 'math_abs_opaque', NaN
 - 13: 'math_floor_opaque', NaN
 - 14: 'math_max_opaque', NaN
 - 15: 'math_min_arg1'
 - 16: 'math_min_opaque', NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
