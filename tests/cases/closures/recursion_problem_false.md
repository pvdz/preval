# Preval test case

# recursion_problem_false.md

> Closures > Recursion problem false
>
> SSA and a function that refers to itself and gets overridden

It's a very contrived example. The point is that the init to f also contains a reference to f so if SSA changes the name, this must not break.

In this particular case, the function is immediately called (triggering the SSA condition).

I think we're saved by the fact that the read will be visited earlier than the var decl which correctly prevents this SSA case in the first place.

## Input

`````js filename=intro
let f = function(bool) {
  // Since the rhs of an assignment is visited before the lhs, these references of `f` will
  // be found before the var decl. In that case, certain SSA hyper optimizations are skipped.
  if (bool) {
    $(1, 'true');
    return f;
  } else {
    f = function(){ return () => $(2, 'false'); }
    return f;
  }
};
// No SSA here
f = f(false);
$(f());
`````


## Settled


`````js filename=intro
const tmpReturnArg /*:()=>unknown*/ = function () {
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = $(2, `false`);
  return tmpReturnArg$1;
};
let f /*:(unknown)=>unknown*/ = function ($$0) {
  const bool /*:unknown*/ = $$0;
  debugger;
  if (bool) {
    $(1, `true`);
    return f;
  } else {
    f = function () {
      debugger;
      return tmpReturnArg;
    };
    return f;
  }
};
f = f(false);
const tmpCalleeParam /*:unknown*/ = f();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpReturnArg = function () {
  const tmpReturnArg$1 = $(2, `false`);
  return tmpReturnArg$1;
};
let f = function (bool) {
  if (bool) {
    $(1, `true`);
    return f;
  } else {
    f = function () {
      return tmpReturnArg;
    };
    return f;
  }
};
f = f(false);
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 2, "false" );
  return b;
};
let c = function($$0 ) {
  const d = $$0;
  debugger;
  if (d) {
    $( 1, "true" );
    return c;
  }
  else {
    c = function() {
      debugger;
      return a;
    };
    return c;
  }
};
c = c( false );
const e = c();
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
