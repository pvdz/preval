# Preval test case

# empty_arr.md

> Normalize > Array > Empty arr
>
> Special path to leaving empty arrs at some point.

## Input

`````js filename=intro
function f() {
  [];
}
const t = f();
$(t);
`````

## Settled


`````js filename=intro
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  [];
};
const t = f();
$(t);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
const t = f();
$(t);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
