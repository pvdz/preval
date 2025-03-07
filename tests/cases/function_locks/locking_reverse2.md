# Preval test case

# locking_reverse2.md

> Function locks > Locking reverse2
>
> A func that is being cleared after being called once is "locked". I guess.

- In this case the function gets called before it is tested ...

## Input

`````js filename=intro
let f = function() {
  $(`call me once`);
};
const g = function() {
  f();
  if (f) {
    f = false;
  }
};
g();
$(1);
g();
$(2);
`````

## Settled


`````js filename=intro
let tmpFuncLock /*:boolean*/ = true;
const g /*:()=>unknown*/ = function () {
  debugger;
  if (tmpFuncLock) {
    $(`call me once`);
    if (tmpFuncLock) {
      tmpFuncLock = false;
      return undefined;
    } else {
      return undefined;
    }
  } else {
    throw `Preval: cannot call a locked function (binding overwritten with non-func)`;
  }
};
g();
$(1);
g();
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpFuncLock = true;
const g = function () {
  if (tmpFuncLock) {
    $(`call me once`);
    if (tmpFuncLock) {
      tmpFuncLock = false;
    }
  } else {
    throw `Preval: cannot call a locked function (binding overwritten with non-func)`;
  }
};
g();
$(1);
g();
$(2);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(`call me once`);
};
const g = function () {
  debugger;
  f();
  if (f) {
    f = false;
  }
};
g();
$(1);
g();
$(2);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(`call me once`);
  return undefined;
};
const g = function () {
  debugger;
  f();
  if (f) {
    f = false;
    return undefined;
  } else {
    return undefined;
  }
};
g();
$(1);
g();
$(2);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = true;
const b = function() {
  debugger;
  if (a) {
    $( "call me once" );
    if (a) {
      a = false;
      return undefined;
    }
    else {
      return undefined;
    }
  }
  else {
    throw "Preval: cannot call a locked function (binding overwritten with non-func)";
  }
};
b();
$( 1 );
b();
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'call me once'
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
