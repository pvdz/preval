# Preval test case

# memberexpression.md

> Let hoisting > Memberexpression
>
> Member expression was causing problems

## Input

`````js filename=intro
let f = function () {
  if ($) {
    a = $;
    return undefined;
  }
};
let b = $;
let a = b.a;

`````

## Settled


`````js filename=intro
$.a;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$.a;
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    a = $;
    return undefined;
  }
};
let b = $;
let a = b.a;
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    a = $;
    return undefined;
  } else {
    return undefined;
  }
};
let b = $;
let a = b.a;
`````

## PST Settled
With rename=true

`````js filename=intro
$.a;
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
