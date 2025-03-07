# Preval test case

# xpp.md

> Incdec > Dec > Xpp
>
>

## Input

`````js filename=intro
let x = $(0);
let y = x--;
$(y);
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(0);
const tmpClusterSSA_x /*:number*/ = x - 1;
$(x);
$(tmpClusterSSA_x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(0);
const tmpClusterSSA_x = x - 1;
$(x);
$(tmpClusterSSA_x);
`````

## Pre Normal


`````js filename=intro
let x = $(0);
let y = x--;
$(y);
$(x);
`````

## Normalized


`````js filename=intro
let x = $(0);
const tmpPostUpdArgIdent = x;
x = x - 1;
let y = tmpPostUpdArgIdent;
$(y);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = a - 1;
$( a );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
