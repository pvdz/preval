# Preval test case

# ppspy.md

> Incdec > Dec > Ppspy
>
>

## Input

`````js filename=intro
let x = $spy(0);
let y = --x;
$(y);
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(0);
const tmpClusterSSA_x /*:number*/ = x - 1;
$(tmpClusterSSA_x);
$(tmpClusterSSA_x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_x = $spy(0) - 1;
$(tmpClusterSSA_x);
$(tmpClusterSSA_x);
`````

## Pre Normal


`````js filename=intro
let x = $spy(0);
let y = --x;
$(y);
$(x);
`````

## Normalized


`````js filename=intro
let x = $spy(0);
x = x - 1;
let y = x;
$(y);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 0 );
const b = a - 1;
$( b );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [0, 0]
 - 2: '$spy[1].valueOf()', 0
 - 3: -1
 - 4: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
