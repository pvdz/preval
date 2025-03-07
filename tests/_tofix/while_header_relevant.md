# Preval test case

# while_header_relevant.md

> Tofix > while header relevant
>
> While elimination should keep while condition.
> This was a regression where the while condition would throw but because it
> was eliminated the throw didn't happen.

## Input

`````js filename=intro
let y = 1;
while ($LOOP_UNROLL_500) {
  y = y + 1;
  break;
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro

`````

## Pre Normal


`````js filename=intro
let y = 1;
while ($LOOP_UNROLL_500) {
  y = y + 1;
  break;
}
`````

## Normalized


`````js filename=intro
let y = 1;
y = y + 1;
`````

## Settled


`````js filename=intro

`````

## PST Settled
With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - eval returned: undefined

Post settled calls: BAD!!
 - eval returned: undefined

Denormalized calls: BAD!!
 - eval returned: undefined
