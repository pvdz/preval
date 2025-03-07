# Preval test case

# assign_complex_simple_simple.md

> Logical > Or > Assign complex simple simple
>
> Logical ops need to be normalized

## Input

`````js filename=intro
var x;
$(x = 1 || 2);
`````

## Settled


`````js filename=intro
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$((x = 1 || 2));
`````

## Normalized


`````js filename=intro
let x = undefined;
x = 1;
if (x) {
} else {
  x = 2;
}
let tmpCalleeParam = x;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
