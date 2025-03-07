# Preval test case

# ref_in_else.md

> Ssa > Ref in else
>
> What happens if there are future refs but they are in a sibling branch

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
  } else {
    // This ref can not reach the assign but it should not prevent SSA
    $(x);
  }
}
`````

## Settled


`````js filename=intro

`````

## Denormalized
(This ought to be the final result)

`````js filename=intro

`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
  } else {
    $(x);
  }
};
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
    return undefined;
  } else {
    $(x);
    return undefined;
  }
};
`````

## PST Settled
With rename=true

`````js filename=intro

`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
