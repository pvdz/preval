# Preval test case

# unknown_init.md

> Const aliasing > Unknown init
>
>

## Input

`````js filename=intro
const x = $(1);
const y = x;
$(x, y);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
$(x, x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
$(x, x);
`````

## Pre Normal


`````js filename=intro
const x = $(1);
const y = x;
$(x, y);
`````

## Normalized


`````js filename=intro
const x = $(1);
const y = x;
$(x, y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
