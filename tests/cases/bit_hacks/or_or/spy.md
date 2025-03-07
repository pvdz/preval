# Preval test case

# spy.md

> Bit hacks > Or or > Spy
>
> If a value is orred to two primitives, you can at least safely merge those primitive.

## Input

`````js filename=intro
const a = $spy();
const b = a | 16;
const c = b | 32;
$(c);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $spy();
const b /*:number*/ = a | 48;
$(b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($spy() | 48);
`````

## Pre Normal


`````js filename=intro
const a = $spy();
const b = a | 16;
const c = b | 32;
$(c);
`````

## Normalized


`````js filename=intro
const a = $spy();
const b = a | 16;
const c = b | 32;
$(c);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = a | 48;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: 12345
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
