# Preval test case

# while2.md

> Normalize > Dce > Return > While2
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    return $(1, 'return');
    $('fail');
  }
  $('keep, do not eval');
}
$(f());
`````

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpReturnArg /*:unknown*/ = $(1, `return`);
  tmpCalleeParam = tmpReturnArg;
} else {
  $(`keep, do not eval`);
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
if ($(true)) {
  tmpCalleeParam = $(1, `return`);
} else {
  $(`keep, do not eval`);
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  while ($(true)) {
    return $(1, `return`);
    $(`fail`);
  }
  $(`keep, do not eval`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      const tmpReturnArg = $(1, `return`);
      return tmpReturnArg;
    } else {
      break;
    }
  }
  $(`keep, do not eval`);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( true );
if (b) {
  const c = $( 1, "return" );
  a = c;
}
else {
  $( "keep, do not eval" );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 1, 'return'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
