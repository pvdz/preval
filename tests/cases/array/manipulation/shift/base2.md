# Preval test case

# base2.md

> Array > Manipulation > Shift > Base2

A regression was causing array.shift() to be identified as returning an array.

## Input

`````js filename=intro
const arr1 = [`a`, `b`, `c`];
const secretArr = $(arr1);
const ARR = [...secretArr];
const NOT_AN_ARRAY = ARR.shift(); // Some times you have to be explicit ;)
$(NOT_AN_ARRAY);

`````


## Settled


`````js filename=intro
const arr1 /*:array*/ /*truthy*/ = [`a`, `b`, `c`];
const secretArr /*:unknown*/ = $(arr1);
const ARR /*:array*/ /*truthy*/ = [...secretArr];
const NOT_AN_ARRAY /*:unknown*/ /*truthy*/ = $dotCall($array_shift, ARR, `shift`);
$(NOT_AN_ARRAY);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const secretArr = $([`a`, `b`, `c`]);
$($dotCall($array_shift, [...secretArr], `shift`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
const b = $( a );
const c = [ ...b ];
const d = $dotCall( $array_shift, c, "shift" );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr1 = [`a`, `b`, `c`];
const secretArr = $(arr1);
const ARR = [...secretArr];
const tmpMCF = ARR.shift;
const NOT_AN_ARRAY = $dotCall(tmpMCF, ARR, `shift`);
$(NOT_AN_ARRAY);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_shift
- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['a', 'b', 'c']
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
