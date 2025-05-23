# Preval test case

# base_falsey.md

> Typing > Base falsey
>
> We want to track the type of bindings when we can, and maybe even limit it to a particular set when feasible

## Input

`````js filename=intro
function g(arg) {
  $(arg);
  $(arg);
  $(arg);
}
function f(x) {
  // The idea is that we know `b` is `true` or `false`
  const b = x === 10;
  // And we know that we'll _know_ the value of `b` inside each branch
  if (b) {
    $('a', b);
    return g(b);
  } else {
    $('b', b);
    return g(b);
  }
}
f($(1));
`````


## Settled


`````js filename=intro
const g /*:(boolean)=>undefined*/ = function ($$0) {
  const arg /*:boolean*/ = $$0;
  debugger;
  $(arg);
  $(arg);
  $(arg);
  return undefined;
};
const tmpCalleeParam /*:unknown*/ = $(1);
const b /*:boolean*/ = tmpCalleeParam === 10;
if (b) {
  $(`a`, true);
  g(true);
} else {
  $(`b`, false);
  g(false);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function (arg) {
  $(arg);
  $(arg);
  $(arg);
};
if ($(1) === 10) {
  $(`a`, true);
  g(true);
} else {
  $(`b`, false);
  g(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( b );
  $( b );
  $( b );
  return undefined;
};
const c = $( 1 );
const d = c === 10;
if (d) {
  $( "a", true );
  a( true );
}
else {
  $( "b", false );
  a( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  const b = x === 10;
  if (b) {
    $(`a`, b);
    const tmpReturnArg = g(b);
    return tmpReturnArg;
  } else {
    $(`b`, b);
    const tmpReturnArg$1 = g(b);
    return tmpReturnArg$1;
  }
};
let g = function ($$0) {
  let arg = $$0;
  debugger;
  $(arg);
  $(arg);
  $(arg);
  return undefined;
};
const tmpCallCallee = f;
let tmpCalleeParam = $(1);
f(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'b', false
 - 3: false
 - 4: false
 - 5: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
