# Preval test case

# inv.md

> Normalize > Unary > Typeof > Inv
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof !$(100));
`````

## Settled


`````js filename=intro
$(100);
$(`boolean`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(`boolean`);
`````

## Pre Normal


`````js filename=intro
$(typeof !$(100));
`````

## Normalized


`````js filename=intro
$(100);
const tmpCalleeParam = `boolean`;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( "boolean" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
