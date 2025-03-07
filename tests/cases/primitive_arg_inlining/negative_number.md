# Preval test case

# negative_number.md

> Primitive arg inlining > Negative number
>
> Negative number should be inlinable

## Input

`````js filename=intro
function f(a) {
  return a;
}
$(f(-1));
`````

## Settled


`````js filename=intro
$(-1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
$(f(-1));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
const tmpCalleeParam = f(-1);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( -1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
