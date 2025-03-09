# Preval test case

# var_simple_simple.md

> Logical > Or > Var simple simple
>
> Logical ops need to be normalized

## Input

`````js filename=intro
const x = 1 || 2;
$(x);
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
const x = 1 || 2;
$(x);
`````

## Normalized


`````js filename=intro
let x = 1;
if (x) {
  $(x);
} else {
  x = 2;
  $(x);
}
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
