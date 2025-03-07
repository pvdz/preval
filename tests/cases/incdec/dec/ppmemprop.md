# Preval test case

# ppmemprop.md

> Incdec > Dec > Ppmemprop
>
>

## Input

`````js filename=intro
let y = --$($spy(100)).x;
$(y);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy(100);
const varInitAssignLhsComputedObj /*:unknown*/ = $(tmpCalleeParam);
const tmpBinLhs /*:unknown*/ = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs /*:number*/ = tmpBinLhs - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedObj = $($spy(100));
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedObj.x - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs);
`````

## Pre Normal


`````js filename=intro
let y = --$($spy(100)).x;
$(y);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $spy(100);
const varInitAssignLhsComputedObj = $(tmpCalleeParam);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs - 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let y = varInitAssignLhsComputedRhs;
$(y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 100 );
const b = $( a );
const c = b.x;
const d = c - 1;
b.x = d;
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [100, 100]
 - 2: '<spy[1]>'
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
