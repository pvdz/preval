# Preval test case

# complex.md

> Normalize > Tagged > Complex
>
> A tagged template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$`abc ${ 10 } def`;
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`abc `, ` def`];
$(tmpCalleeParam, 10);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`abc `, ` def`], 10);
`````

## Pre Normal


`````js filename=intro
$([`abc `, ` def`], 10);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [`abc `, ` def`];
$(tmpCalleeParam, 10);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "abc ", " def" ];
$( a, 10 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['abc ', ' def'], 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
