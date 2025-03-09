# Preval test case

# member_computed.md

> Normalize > Nullish > Member computed
>
> nullish chaining fun

## Input

`````js filename=intro
const x = 10;
$(x??[20]);
`````

## Settled


`````js filename=intro
$(10);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
`````

## Pre Normal


`````js filename=intro
const x = 10;
$(x ?? [20]);
`````

## Normalized


`````js filename=intro
const x = 10;
let tmpCalleeParam = x;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = [20];
  $(tmpCalleeParam);
} else {
  $(tmpCalleeParam);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 10 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
