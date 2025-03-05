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

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(`call me once`);
};
const g = function () {
  debugger;
  if (f) {
    f();
    f = false;
  } else {
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
const g = function () {
  debugger;
  if (f) {
    f();
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

## Output


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
