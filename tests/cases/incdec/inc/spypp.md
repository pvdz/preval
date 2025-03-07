# Preval test case

# spypp.md

> Incdec > Inc > Spypp
>
>

## Input

`````js filename=intro
let x = $spy(0);
let y = x++;
$(y);
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(0);
const tmpClusterSSA_x /*:primitive*/ = x + 1;
$(x);
$(tmpClusterSSA_x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy(0);
const tmpClusterSSA_x = x + 1;
$(x);
$(tmpClusterSSA_x);
`````

## Pre Normal


`````js filename=intro
let x = $spy(0);
let y = x++;
$(y);
$(x);
`````

## Normalized


`````js filename=intro
let x = $spy(0);
const tmpPostUpdArgIdent = x;
x = x + 1;
let y = tmpPostUpdArgIdent;
$(y);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 0 );
const b = a + 1;
$( a );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [0, 0]
 - 2: '$spy[1].valueOf()', 0
 - 3: 0
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD!?
 - 1: 'Creating spy', 1, 1, [0, 0]
 - 2: '$spy[1].valueOf()', 0
 - 3: '<spy[1]>'
 - 4: 1
 - eval returned: undefined

Post settled calls: BAD!!
 - 1: 'Creating spy', 1, 1, [0, 0]
 - 2: '$spy[1].valueOf()', 0
 - 3: '<spy[1]>'
 - 4: 1
 - eval returned: undefined

Denormalized calls: BAD!!
 - 1: 'Creating spy', 1, 1, [0, 0]
 - 2: '$spy[1].valueOf()', 0
 - 3: '<spy[1]>'
 - 4: 1
 - eval returned: undefined
