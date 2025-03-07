# Preval test case

# assign.md

> Normalize > Ternary > Assign
>
> If an assignment is a statement then a ternary should become an if-else

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
a = b ? c : d;
$(a);
`````

## Settled


`````js filename=intro
$(3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2,
  c = 3,
  d = 4;
a = b ? c : d;
$(a);
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
if (b) {
  a = c;
} else {
  a = d;
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
