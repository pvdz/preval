# Preval test case

# try_hell_o.md

> Flow > Try block throw early > Try hell o
>
> Bunch of try/catch/finally cases

## Options

- globals: fail_early

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    fail_early
    throw x;
  } finally {
    break stop; // Overrides the throw
  }
  x = 1;
}
f();
$(x);
`````


## Settled


`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {}
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {}
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  fail_early;
}
catch (a) {

}
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      fail_early;
      $finalStep = true;
      $finalArg = x;
      break $finally;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  x = 1;
  return undefined;
};
let x = 0;
f();
$(x);
`````


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
