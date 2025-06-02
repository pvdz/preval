# Preval test case

# global_truthy.md

> Type tracked > Invert > Global truthy
>
> Inverting a value that we know is a falsy value must return true

## Input

`````js filename=intro
function f() {
  if ($) {
    $(!$, 'fail');
  } else {
    $(!$, 'pass');
  }
}
f();
f();
f();
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  if ($) {
    $(false, `fail`);
    return undefined;
  } else {
    $(true, `pass`);
    return undefined;
  }
};
f();
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  if ($) {
    $(false, `fail`);
  } else {
    $(true, `pass`);
  }
};
f();
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if ($) {
    $( false, "fail" );
    return undefined;
  }
  else {
    $( true, "pass" );
    return undefined;
  }
};
a();
a();
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let tmpCalleeParam = false;
    $(tmpCalleeParam, `fail`);
    return undefined;
  } else {
    let tmpCalleeParam$1 = true;
    $(tmpCalleeParam$1, `pass`);
    return undefined;
  }
};
f();
f();
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false, 'fail'
 - 2: false, 'fail'
 - 3: false, 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
