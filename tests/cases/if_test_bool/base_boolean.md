# Preval test case

# base_boolean.md

> If test bool > Base boolean
>
> A constant that is tested in an `if` must hold when inverted

## Input

`````js filename=intro
function f(x) {
  if (x) {
    $('a', Boolean(x));
  } else {
    $('b', Boolean(x));
  }
}
f($(1));
f($(0));
`````

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
if (tmpCalleeParam$3) {
  $(`a`, true);
} else {
  $(`b`, false);
}
const tmpCalleeParam$5 /*:unknown*/ = $(0);
if (tmpCalleeParam$5) {
  $(`a`, true);
} else {
  $(`b`, false);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`a`, true);
} else {
  $(`b`, false);
}
if ($(0)) {
  $(`a`, true);
} else {
  $(`b`, false);
}
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  if (x) {
    $(`a`, Boolean(x));
  } else {
    $(`b`, Boolean(x));
  }
};
f($(1));
f($(0));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  if (x) {
    const tmpCalleeParam = Boolean(x);
    $(`a`, tmpCalleeParam);
    return undefined;
  } else {
    const tmpCalleeParam$1 = Boolean(x);
    $(`b`, tmpCalleeParam$1);
    return undefined;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam$3 = $(1);
tmpCallCallee(tmpCalleeParam$3);
const tmpCallCallee$1 = f;
const tmpCalleeParam$5 = $(0);
tmpCallCallee$1(tmpCalleeParam$5);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "a", true );
}
else {
  $( "b", false );
}
const b = $( 0 );
if (b) {
  $( "a", true );
}
else {
  $( "b", false );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'a', true
 - 3: 0
 - 4: 'b', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
