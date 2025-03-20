# Preval test case

# base.md

> Locking > Base
>
> A func that is being cleared after being called once is "locked". I guess.

## Input

`````js filename=intro
function f() {
  $('call me once');
}
function g() {
  let x = f;
  if (f) {
    f();
    f = false;
  }
}
$(g());
$(g());
`````


## Settled


`````js filename=intro
let tmpFuncLock /*:boolean*/ = true;
const g /*:()=>unknown*/ = function () {
  debugger;
  if (tmpFuncLock) {
    $(`call me once`);
    tmpFuncLock = false;
    return undefined;
  } else {
    return undefined;
  }
};
g();
$(undefined);
g();
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpFuncLock = true;
const g = function () {
  if (tmpFuncLock) {
    $(`call me once`);
    tmpFuncLock = false;
  }
};
g();
$(undefined);
g();
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = true;
const b = function() {
  debugger;
  if (a) {
    $( "call me once" );
    a = false;
    return undefined;
  }
  else {
    return undefined;
  }
};
b();
$( undefined );
b();
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'call me once'
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
