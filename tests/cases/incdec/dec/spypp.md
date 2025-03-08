# Preval test case

# spypp.md

> Incdec > Dec > Spypp
>
>

## Input

`````js filename=intro
let x = $spy(0);
let y = x--;
$(y);
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(0);
const tmpPostUpdArgIdent /*:number*/ = $coerce(x, `number`);
$(tmpPostUpdArgIdent);
const tmpClusterSSA_x /*:number*/ = tmpPostUpdArgIdent - 1;
$(tmpClusterSSA_x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpPostUpdArgIdent = $coerce($spy(0), `number`);
$(tmpPostUpdArgIdent);
$(tmpPostUpdArgIdent - 1);
`````

## Pre Normal


`````js filename=intro
let x = $spy(0);
let y = x--;
$(y);
$(x);
`````

## Normalized


`````js filename=intro
let x = $spy(0);
const tmpPostUpdArgIdent = $coerce(x, `number`);
x = tmpPostUpdArgIdent - 1;
let y = tmpPostUpdArgIdent;
$(y);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 0 );
const b = $coerce( a, "number" );
$( b );
const c = b - 1;
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [0, 0]
 - 2: '$spy[1].valueOf()', 0
 - 3: 0
 - 4: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
