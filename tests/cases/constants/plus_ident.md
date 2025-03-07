# Preval test case

# plus_ident.md

> Constants > Plus ident
>
> Positive idents that are not builtins should be treated as normal

## Input

`````js filename=intro
const x = $(5);
const y = +x;
const z = y;
$(z); // Should be inlined to y, not -5
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(5);
const y /*:number*/ = +x;
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(5);
$(+x);
`````

## Pre Normal


`````js filename=intro
const x = $(5);
const y = +x;
const z = y;
$(z);
`````

## Normalized


`````js filename=intro
const x = $(5);
const y = +x;
const z = y;
$(z);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 5 );
const b = +a;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 5
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
