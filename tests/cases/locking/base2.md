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

## Pre Normal


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

## Normalized


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

## Output


`````js filename=intro
let f = true;
const g = function () {
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

## PST Output

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

## Result

Should call `$` with:
 - 1: 'call me once'
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
