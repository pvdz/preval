# Preval test case

# empty.md

> Normalize > Pattern > Param > Rest > Empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f(...x) {
  return x;
}
$(f());
`````

## Settled


`````js filename=intro
const x /*:array*/ = [];
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([]);
`````

## Pre Normal


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let x = $$0;
  debugger;
  return x;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let x = $$0;
  debugger;
  return x;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- drop unused rest param?
