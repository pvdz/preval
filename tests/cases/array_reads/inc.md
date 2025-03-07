# Preval test case

# inc.md

> Array reads > Inc
>
> Inlining array properties

(This actually caused a syntax erorr at one point, oops)

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(++arr[0]);
`````

## Settled


`````js filename=intro
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
$(++arr[0]);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
const tmpBinLhs = arr[0];
const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
arr[0] = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
