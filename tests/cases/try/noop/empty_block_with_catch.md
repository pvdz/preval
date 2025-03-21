# Preval test case

# empty_block_with_catch.md

> Try > Noop > Empty block with catch
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f() {
  try {
  } catch {
    $('fail');
  }
}
f();
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
  try {
  } catch (e) {
    $(`fail`);
  }
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
f();
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
