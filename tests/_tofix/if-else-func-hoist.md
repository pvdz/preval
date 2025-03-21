# Preval test case

# if-else-func-hoist.md

> Tofix > if-else-func-hoist

From 2021-08-09_orus_console_hijacker.js
(There's another tofix for the `arg` typing of `repeat`, that's irrelevant here.)

Two things:

One:

The assignment to `closure_cond` is non-trivial to detect as non-observable because it's already a 
closure (closed by `repeat`). As such the call to `inline_me` can not be hoisted up safely unless
the `noop` algorithm also asserts that the functions assigned to `inline_me` both don't access the
closure. Which they can't in a generic way, due to transitive rules. And it'd be too expensive.
In this case it's irrelevant what actual value is assigned to `closure_cond`. It's about being a
closure that is observable and therefor much harder to predict for preval.

We have to find a different way.

We can check whether the closure is used in any deeper scope than this. 

Two:
The `closure_cond` is set a truthy value after which it can never be falsy. Additionally that value
is not actually read, other than as an `if` test. This means we should be able to safely change that
to a `true` instead. It won't fix the above but it should be better regardless.

In addition, if we know the first call to the function is going to have a distinct branching pattern
that is different from all the other calls, then maybe it's worth splitting it up?

## Input

`````js filename=intro
let closure_cond = false;    // <-- In this particular predictable case, we can predict that the first call permanently sets a truthy value?
const repeat = function(arg) {
  let inline_me = undefined;     // <-- maybe we can fix the typing on this case as well; where it invariably gets assigned a value... and the undefined is never observed.
  if (closure_cond) {
    inline_me = function() {
      $('a')
    };
  } else {
    inline_me = function() {
      $('b')
    };
  }
  closure_cond = [];    // <-- the array is never observed, only as a truthy value. can we set it to `true` here instead?
  inline_me();          // <-- If this statement appeared one higher, above `closure_cond = []`, then preval would inline the func
  repeat(arg + 1);
};
repeat(0);
$(repeat);
`````


## Settled


`````js filename=intro
let closure_cond /*:unknown*/ = false;
const repeat /*:(unknown)=>undefined*/ = function ($$0) {
  const arg /*:unknown*/ = $$0;
  debugger;
  let inline_me /*:unknown*/ = undefined;
  if (closure_cond) {
    inline_me = function () {
      debugger;
      $(`a`);
      return undefined;
    };
  } else {
    inline_me = function () {
      debugger;
      $(`b`);
      return undefined;
    };
  }
  closure_cond = [];
  inline_me();
  const tmpCalleeParam /*:primitive*/ = arg + 1;
  repeat(tmpCalleeParam);
  return undefined;
};
repeat(0);
$(repeat);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let closure_cond = false;
const repeat = function (arg) {
  let inline_me = undefined;
  if (closure_cond) {
    inline_me = function () {
      $(`a`);
    };
  } else {
    inline_me = function () {
      $(`b`);
    };
  }
  closure_cond = [];
  inline_me();
  repeat(arg + 1);
};
repeat(0);
$(repeat);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = false;
const b = function($$0 ) {
  const c = $$0;
  debugger;
  let d = undefined;
  if (a) {
    d = function() {
      debugger;
      $( "a" );
      return undefined;
    };
  }
  else {
    d = function() {
      debugger;
      $( "b" );
      return undefined;
    };
  }
  a = [];
  d();
  const e = c + 1;
  b( e );
  return undefined;
};
b( 0 );
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'b'
 - 2: 'a'
 - 3: 'a'
 - 4: 'a'
 - 5: 'a'
 - 6: 'a'
 - 7: 'a'
 - 8: 'a'
 - 9: 'a'
 - 10: 'a'
 - 11: 'a'
 - 12: 'a'
 - 13: 'a'
 - 14: 'a'
 - 15: 'a'
 - 16: 'a'
 - 17: 'a'
 - 18: 'a'
 - 19: 'a'
 - 20: 'a'
 - 21: 'a'
 - 22: 'a'
 - 23: 'a'
 - 24: 'a'
 - 25: 'a'
 - 26: 'a'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
