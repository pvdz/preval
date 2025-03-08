# Preval test case

# nested_if.md

> Tofix > nested if
>
> Seems this case is not handled. The nested lock check should fold up.

## Input

`````js filename=intro
let tmpFuncLock = true;
const g = function () {
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
let tmpFuncLock = true;
const g = function () {
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

## Normalized


`````js filename=intro
let tmpFuncLock = true;
const g = function () {
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
