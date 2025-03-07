# Preval test case

# number_tostring_expr.md

> Property lookup > Number tostring expr

## Input

`````js filename=intro
const x = $Number_prototype.toString;
$(x);
`````

## Settled


`````js filename=intro
$($number_toString);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($number_toString);
`````

## Pre Normal


`````js filename=intro
const x = $Number_prototype.toString;
$(x);
`````

## Normalized


`````js filename=intro
const x = $Number_prototype.toString;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( $number_toString );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
