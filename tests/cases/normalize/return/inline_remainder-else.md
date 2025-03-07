# Preval test case

# inline_remainder-else.md

> Normalize > Return > Inline remainder-else
>
> If one branch returns early the remainder of the parent block should be inlined after the other branch.

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    $(2);
  } else {
    $(3);
    return $(4);
  }
  $(5);
}
$(f());
`````

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(2);
  $(5);
} else {
  $(3);
  const tmpReturnArg /*:unknown*/ = $(4);
  tmpCalleeParam = tmpReturnArg;
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
if ($(1)) {
  $(2);
  $(5);
} else {
  $(3);
  tmpCalleeParam = $(4);
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    $(2);
  } else {
    $(3);
    return $(4);
  }
  $(5);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(2);
    $(5);
    return undefined;
  } else {
    $(3);
    const tmpReturnArg = $(4);
    return tmpReturnArg;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  $( 2 );
  $( 5 );
}
else {
  $( 3 );
  const c = $( 4 );
  a = c;
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 5
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
