# Preval test case

# locking_reverse.md

> Function locks > Locking reverse
>
> A func that is being cleared after being called once is "locked". I guess.

- In this case the function gets tested before it is called ...

## Input

`````js filename=intro
let f = function() {
  $(`call me once`);
};
const g = function() {
  if (f) {
    f();
    f = false;
  } else {
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


## Todos triggered


None


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
