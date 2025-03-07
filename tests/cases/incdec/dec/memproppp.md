# Preval test case

# memproppp.md

> Incdec > Dec > Memproppp
>
>

## Input

`````js filename=intro
let y = $($spy(100)).x--;
$(y);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy(100);
const tmpPostUpdArgObj /*:unknown*/ = $(tmpCalleeParam);
const tmpPostUpdArgVal /*:unknown*/ = tmpPostUpdArgObj.x;
const tmpAssignMemRhs /*:number*/ = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
$(tmpPostUpdArgVal);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpPostUpdArgObj = $($spy(100));
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
tmpPostUpdArgObj.x = tmpPostUpdArgVal - 1;
$(tmpPostUpdArgVal);
`````

## Pre Normal


`````js filename=intro
let y = $($spy(100)).x--;
$(y);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $spy(100);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
let y = tmpPostUpdArgVal;
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
$( c );
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

Normalized calls: BAD!?
 - 1: 'Creating spy', 1, 1, [100, 100]
 - 2: '<spy[1]>'
 - 3: undefined
 - eval returned: undefined

Post settled calls: BAD!!
 - 1: 'Creating spy', 1, 1, [100, 100]
 - 2: '<spy[1]>'
 - 3: undefined
 - eval returned: undefined

Denormalized calls: BAD!!
 - 1: 'Creating spy', 1, 1, [100, 100]
 - 2: '<spy[1]>'
 - 3: undefined
 - eval returned: undefined
