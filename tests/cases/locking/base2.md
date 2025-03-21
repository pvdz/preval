# Preval test case

# base2.md

> Locking > Base2
>
> A func that is being cleared after being called once is "locked". I guess.

## Input

`````js filename=intro
const tmpFuncLock = function () {
  debugger;
  $(`call me once`);
  return undefined;
};
let f = true;
const g = function () {
  debugger;
  if (f) {
    tmpFuncLock();
    f = false;
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


## Settled


`````js filename=intro
let f /*:boolean*/ = true;
const g /*:()=>unknown*/ = function () {
  debugger;
  if (f) {
    $(`call me once`);
    f = false;
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
let f = true;
const g = function () {
  if (f) {
    $(`call me once`);
    f = false;
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
