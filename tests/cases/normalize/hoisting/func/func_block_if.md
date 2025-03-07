# Preval test case

# func_block_if.md

> Normalize > Hoisting > Func > Func block if
>
> Block hoisting func decls

## Input

`````js filename=intro
function g() {
  if ($(1)) {
    f(); // Should be ok
    function f(){ $(1); }
  }
}
g();
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(1);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(1);
}
`````

## Pre Normal


`````js filename=intro
let g = function () {
  debugger;
  if ($(1)) {
    let f = function () {
      debugger;
      $(1);
    };
    f();
  }
};
g();
`````

## Normalized


`````js filename=intro
let g = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    let f = function () {
      debugger;
      $(1);
      return undefined;
    };
    f();
    return undefined;
  } else {
    return undefined;
  }
};
g();
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
