# Preval test case

# string_num_bin.md

> Normalize > Unary > Tilde > String num bin
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~"0o1001");
`````

## Settled


`````js filename=intro
$(-514);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-514);
`````

## Pre Normal


`````js filename=intro
$(~`0o1001`);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = -514;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( -514 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: -514
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
