# Preval test case

# base.md

> Bit hacks > And and > Base
>
> If a value is orred to two primitives, you can at least safely merge those primitive.

## Input

`````js filename=intro
const a = $(0);
const b = a & 48;
const c = b & 32;
$(c);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(0);
const b /*:number*/ = a & 32;
$(b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(0) & 32);
`````

## Pre Normal


`````js filename=intro
const a = $(0);
const b = a & 48;
const c = b & 32;
$(c);
`````

## Normalized


`````js filename=intro
const a = $(0);
const b = a & 48;
const c = b & 32;
$(c);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = a & 32;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
