# Preval test case

# reverse.md

> Locking > Reverse
>
> A func that is being cleared after being called once is "locked". I guess.

In this case the function gets called before it is tested ...

## Input

`````js filename=intro
function f() {
  $('call me once');
}
function g() {
  let x = f;
  f();
  if (f) {
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
    if (tmpFuncLock) {
      tmpFuncLock = false;
    }
  } else {
    throw `Preval: cannot call a locked function (binding overwritten with non-func)`;
  }
};
g();
$(undefined);
g();
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(`call me once`);
};
let g = function () {
  debugger;
  let x = f;
  f();
  if (f) {
    f = false;
  }
};
$(g());
$(g());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(`call me once`);
  return undefined;
};
let g = function () {
  debugger;
  let x = f;
  f();
  if (f) {
    f = false;
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = g();
$(tmpCalleeParam);
const tmpCalleeParam$1 = g();
$(tmpCalleeParam$1);
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
