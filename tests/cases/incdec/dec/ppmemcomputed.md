# Preval test case

# ppmemcomputed.md

> Incdec > Dec > Ppmemcomputed
>
>

## Input

`````js filename=intro
let x = --$($spy(100))[$spy(1)];
$(x);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy(100);
const varInitAssignLhsComputedObj /*:unknown*/ = $(tmpCalleeParam);
const varInitAssignLhsComputedProp /*:unknown*/ = $spy(1);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 1;
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedObj = $($spy(100));
const varInitAssignLhsComputedProp = $spy(1);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 1;
$(1);
`````

## Pre Normal


`````js filename=intro
let x = --$($spy(100))[$spy(1)];
$(x);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $spy(100);
const varInitAssignLhsComputedObj = $(tmpCalleeParam);
const varInitAssignLhsComputedProp = $spy(1);
const varInitAssignLhsComputedRhs = 1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
let x = varInitAssignLhsComputedRhs;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 100 );
const b = $( a );
const c = $spy( 1 );
b[c] = 1;
$( 1 );
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
 - 5: 1
 - eval returned: undefined

Post settled calls: BAD!!
 - 1: 'Creating spy', 1, 1, [100, 100]
 - 2: '<spy[1]>'
 - 3: 'Creating spy', 2, 1, [1, 1]
 - 4: '$spy[2].toString()', 1
 - 5: 1
 - eval returned: undefined

Denormalized calls: BAD!!
 - 1: 'Creating spy', 1, 1, [100, 100]
 - 2: '<spy[1]>'
 - 3: 'Creating spy', 2, 1, [1, 1]
 - 4: '$spy[2].toString()', 1
 - 5: 1
 - eval returned: undefined
