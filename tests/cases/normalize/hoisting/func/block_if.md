# Preval test case

# block_if.md

> Normalize > Hoisting > Func > Block if
>
> Block hoisting func decls

## Input

`````js filename=intro
if ($(1)) {
  f(); // Should be ok
  function f(){ $(1); } // this is let f = function(){}
}
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
if ($(1)) {
  let f = function () {
    debugger;
    $(1);
  };
  f();
}
`````

## Normalized


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  let f = function () {
    debugger;
    $(1);
    return undefined;
  };
  f();
} else {
}
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
