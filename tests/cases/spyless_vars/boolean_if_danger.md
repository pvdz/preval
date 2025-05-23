# Preval test case

# boolean_if_danger.md

> Spyless vars > Boolean if danger
>
> Boolean the condition

The problem is that there may be a spy that may be affected by moving a var decl. So it's very non-trivial.

## Input

`````js filename=intro
function f(y) {
  const g = function(){ 
    return x;
  };
  const x = Boolean(y);
  if (y) {
    g(); // Oops. x is indirectly referenced so if we move the decl this call will TDZ up.
    return y;
  } else {
    return x;
  }
}
$(f($(1)));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
if (tmpCalleeParam$1) {
  $(tmpCalleeParam$1);
} else {
  $(false);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(1);
if (tmpCalleeParam$1) {
  $(tmpCalleeParam$1);
} else {
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( a );
}
else {
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let y = $$0;
  debugger;
  const g = function () {
    debugger;
    return x;
  };
  const x = $boolean_constructor(y);
  if (y) {
    g();
    return y;
  } else {
    return x;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = $(1);
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
