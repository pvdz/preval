# Preval test case

# string_num_dec.md

> Normalize > Unary > Tilde > String num dec
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~"1005");
`````

## Settled


`````js filename=intro
$(-1006);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1006);
`````

## Pre Normal


`````js filename=intro
$(~`1005`);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = -1006;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( -1006 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: -1006
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
