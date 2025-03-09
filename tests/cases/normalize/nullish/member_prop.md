# Preval test case

# member_prop.md

> Normalize > Nullish > Member prop
>
> nullish chaining fun

## Input

`````js filename=intro
const x = 10;
$(x??length);
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
$(x ?? length);
`````

## Normalized


`````js filename=intro
const x = 10;
let tmpCalleeParam = x;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = length;
  $(length);
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
