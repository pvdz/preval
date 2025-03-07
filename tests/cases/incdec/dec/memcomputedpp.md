# Preval test case

# memcomputedpp.md

> Incdec > Dec > Memcomputedpp
>
>

## Input

`````js filename=intro
let x = $($spy(100))[$spy(1)]--;
$(x);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy(100);
const tmpPostUpdArgComObj /*:unknown*/ = $(tmpCalleeParam);
const tmpPostUpdArgComProp /*:unknown*/ = $spy(1);
const tmpPostUpdArgComVal /*:unknown*/ = tmpPostUpdArgComObj[tmpPostUpdArgComProp];
const tmpAssignComputedRhs /*:number*/ = tmpPostUpdArgComVal - 1;
tmpPostUpdArgComObj[tmpPostUpdArgComProp] = tmpAssignComputedRhs;
$(tmpPostUpdArgComVal);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpPostUpdArgComObj = $($spy(100));
const tmpPostUpdArgComProp = $spy(1);
const tmpPostUpdArgComVal = tmpPostUpdArgComObj[tmpPostUpdArgComProp];
const tmpAssignComputedRhs = tmpPostUpdArgComVal - 1;
tmpPostUpdArgComObj[tmpPostUpdArgComProp] = tmpAssignComputedRhs;
$(tmpPostUpdArgComVal);
`````

## Pre Normal


`````js filename=intro
let x = $($spy(100))[$spy(1)]--;
$(x);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $spy(100);
const tmpPostUpdArgComObj = $(tmpCalleeParam);
const tmpPostUpdArgComProp = $spy(1);
const tmpPostUpdArgComVal = tmpPostUpdArgComObj[tmpPostUpdArgComProp];
const tmpAssignComputedObj = tmpPostUpdArgComObj;
const tmpAssignComputedProp = tmpPostUpdArgComProp;
const tmpAssignComputedRhs = tmpPostUpdArgComVal - 1;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
let x = tmpPostUpdArgComVal;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 100 );
const b = $( a );
const c = $spy( 1 );
const d = b[ c ];
const e = d - 1;
b[c] = e;
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [100, 100]
 - 2: '<spy[1]>'
 - 3: 'Creating spy', 2, 1, [1, 1]
 - 4: '$spy[2].toString()', 1
 - 5: '$spy[2].toString()', 1
 - 6: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD!?
 - 1: 'Creating spy', 1, 1, [100, 100]
 - 2: '<spy[1]>'
 - 3: 'Creating spy', 2, 1, [1, 1]
 - 4: '$spy[2].toString()', 1
 - 5: '$spy[2].toString()', 1
 - 6: undefined
 - eval returned: undefined

Post settled calls: BAD!!
 - 1: 'Creating spy', 1, 1, [100, 100]
 - 2: '<spy[1]>'
 - 3: 'Creating spy', 2, 1, [1, 1]
 - 4: '$spy[2].toString()', 1
 - 5: '$spy[2].toString()', 1
 - 6: undefined
 - eval returned: undefined

Denormalized calls: BAD!!
 - 1: 'Creating spy', 1, 1, [100, 100]
 - 2: '<spy[1]>'
 - 3: 'Creating spy', 2, 1, [1, 1]
 - 4: '$spy[2].toString()', 1
 - 5: '$spy[2].toString()', 1
 - 6: undefined
 - eval returned: undefined
