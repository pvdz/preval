# Preval test case

# spied.md

> Bit hacks > And and > Spied
>
> If a value is orred to two primitives, you can at least safely merge those primitive.

## Input

`````js filename=intro
const a = $spy();
const b = a & 48;
const c = b & 32;
$(c);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $spy();
const b /*:number*/ = a & 32;
$(b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($spy() & 32);
`````

## Pre Normal


`````js filename=intro
const a = $spy();
const b = a & 48;
const c = b & 32;
$(c);
`````

## Normalized


`````js filename=intro
const a = $spy();
const b = a & 48;
const c = b & 32;
$(c);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = a & 32;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: 32
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
