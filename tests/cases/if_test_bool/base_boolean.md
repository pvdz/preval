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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  if (x) {
    let tmpCalleeParam = $boolean_constructor(x);
    $(`a`, tmpCalleeParam);
    return undefined;
  } else {
    let tmpCalleeParam$1 = $boolean_constructor(x);
    $(`b`, tmpCalleeParam$1);
    return undefined;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$3 = $(1);
f(tmpCalleeParam$3);
const tmpCallCallee$1 = f;
let tmpCalleeParam$5 = $(0);
f(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
