# Preval test case

# init_call.md

> Normalize > Binding > Init call
>
> Binding declaration with a simple call should not be outlined

## Input

`````js filename=intro
let x = $();
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $();
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($());
`````

## Pre Normal


`````js filename=intro
let x = $();
$(x);
`````

## Normalized


`````js filename=intro
let x = $();
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
