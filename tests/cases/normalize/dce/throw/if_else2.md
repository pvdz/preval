# Preval test case

# if_else2.md

> Normalize > Dce > Throw > If else2
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    throw 2;
    $('fail');
  }
  throw 3;
  $('fail');
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  throw 2;
} else {
  throw 3;
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  throw 2;
} else {
  throw 3;
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    throw 2;
    $(`fail`);
  }
  throw 3;
  $(`fail`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    throw 2;
  } else {
    throw 3;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  throw 2;
}
else {
  throw 3;
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
