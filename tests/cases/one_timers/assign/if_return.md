# Preval test case

# if_return.md

> One timers > Assign > If return
>
> Return inlining

## Input

`````js filename=intro
let x = $(100, 'init');
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return $(x, 'closure-return');
}
$(closure(), 'closure-global1');

function f() {
  if ($()) {
    return $(1, 'f-return');
  }
}

x = f(); // This x should not be SSA'd due to the closure
$(x, 'x-global');
$(closure(), 'closure-global2');
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(100, `init`);
const tmpReturnArg$4 /*:unknown*/ = $(x, `closure-return`);
$(tmpReturnArg$4, `closure-global1`);
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  x = $(1, `f-return`);
  $(x, `x-global`);
} else {
  x = undefined;
  $(undefined, `x-global`);
}
const tmpCalleeParam$1 /*:unknown*/ = $(x, `closure-return`);
$(tmpCalleeParam$1, `closure-global2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(100, `init`);
$($(x, `closure-return`), `closure-global1`);
if ($()) {
  x = $(1, `f-return`);
  $(x, `x-global`);
} else {
  x = undefined;
  $(undefined, `x-global`);
}
$($(x, `closure-return`), `closure-global2`);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 100, "init" );
const b = $( a, "closure-return" );
$( b, "closure-global1" );
const c = $();
if (c) {
  a = $( 1, "f-return" );
  $( a, "x-global" );
}
else {
  a = undefined;
  $( undefined, "x-global" );
}
const d = $( a, "closure-return" );
$( d, "closure-global2" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let closure = function () {
  debugger;
  const tmpReturnArg = $(x, `closure-return`);
  return tmpReturnArg;
};
let f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    const tmpReturnArg$1 = $(1, `f-return`);
    return tmpReturnArg$1;
  } else {
    return undefined;
  }
};
let x = $(100, `init`);
let tmpCalleeParam = closure();
$(tmpCalleeParam, `closure-global1`);
x = f();
$(x, `x-global`);
let tmpCalleeParam$1 = closure();
$(tmpCalleeParam$1, `closure-global2`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100, 'init'
 - 2: 100, 'closure-return'
 - 3: 100, 'closure-global1'
 - 4: 
 - 5: undefined, 'x-global'
 - 6: undefined, 'closure-return'
 - 7: undefined, 'closure-global2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
