# Preval test case

# break.md

> Try escaping > Break
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
let x = 1;
function f() {
  const arr = [1, 2, 3];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    try {
      return $;
      $(arr[0]);
      arr.reverse();
    } catch {
      $('fail');
    }
    x = 2;
    $(x);
  }
}
f();
$(f);
$(x);
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return $;
};
$(f);
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  return $;
});
$(1);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const arr = [1, 2, 3];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    try {
      return $;
      $(arr[0]);
      arr.reverse();
    } catch (e) {
      $(`fail`);
    }
    x = 2;
    $(x);
  }
};
let x = 1;
f();
$(f);
$(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const arr = [1, 2, 3];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    try {
      return $;
    } catch (e) {
      $(`fail`);
    }
    x = 2;
    $(x);
  }
  return undefined;
};
let x = 1;
f();
$(f);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return $;
};
$( a );
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
