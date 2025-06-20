# Preval test case

# base_true2.md

> Typing > Base true2
>
> We want to track the type of bindings when we can, and maybe even limit it to a particular set when feasible

## Input

`````js filename=intro
const g = function (arg) {
  $(arg);
  $(arg);
  $(arg);
  return undefined;
};
const tmpCalleeParam = $(10);
const b = tmpCalleeParam === 10;
if (b) {
  $('a', true);
  g(true);
} else {
  $('b', false);
  g(false);
}
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
const tmpCalleeParam /*:unknown*/ = $(10);
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
if ($(10) === 10) {
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
const c = $( 10 );
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
const g = function ($$0) {
  let arg = $$0;
  debugger;
  $(arg);
  $(arg);
  $(arg);
  return undefined;
};
const tmpCalleeParam = $(10);
const b = tmpCalleeParam === 10;
if (b) {
  $(`a`, true);
  g(true);
} else {
  $(`b`, false);
  g(false);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 'a', true
 - 3: true
 - 4: true
 - 5: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
