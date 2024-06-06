# Preval test case

# regression.md

> Conditional typing > Regression
>
> wat

#TODO

## Input

`````js filename=intro
let curtype = 0;
function getType() {
  return curtype;
}
function skip() {
  curtype = $('random');
}
function f() {
  if (getType() !== 16472) {
    $('a');
  } else {
    skip(lexerFlags);
    if (getType() === 16473) {
      $('x');
    } else {
      $('y');
    }
  }
}

f();
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if (getType() !== 16472) {
    $(`a`);
  } else {
    skip(lexerFlags);
    if (getType() === 16473) {
      $(`x`);
    } else {
      $(`y`);
    }
  }
};
let getType = function () {
  debugger;
  return curtype;
};
let skip = function () {
  debugger;
  curtype = $(`random`);
};
let curtype = 0;
f();
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpBinLhs = getType();
  const tmpIfTest = tmpBinLhs !== 16472;
  if (tmpIfTest) {
    $(`a`);
    return undefined;
  } else {
    skip(lexerFlags);
    const tmpBinLhs$1 = getType();
    const tmpIfTest$1 = tmpBinLhs$1 === 16473;
    if (tmpIfTest$1) {
      $(`x`);
      return undefined;
    } else {
      $(`y`);
      return undefined;
    }
  }
};
let getType = function () {
  debugger;
  return curtype;
};
let skip = function () {
  debugger;
  curtype = $(`random`);
  return undefined;
};
let curtype = 0;
f();
f();
`````

## Output


`````js filename=intro
let curtype = 0;
const f = function () {
  debugger;
  const tmpIfTest = curtype === 16472;
  if (tmpIfTest) {
    lexerFlags;
    curtype = $(`random`);
    const tmpIfTest$1 = curtype === 16473;
    if (tmpIfTest$1) {
      $(`x`);
      return undefined;
    } else {
      $(`y`);
      return undefined;
    }
  } else {
    $(`a`);
    return undefined;
  }
};
f();
f();
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
const b = function() {
  debugger;
  const c = a === 16472;
  if (c) {
    lexerFlags;
    a = $( "random" );
    const d = a === 16473;
    if (d) {
      $( "x" );
      return undefined;
    }
    else {
      $( "y" );
      return undefined;
    }
  }
  else {
    $( "a" );
    return undefined;
  }
};
b();
b();
`````

## Globals

BAD@! Found 1 implicit global bindings:

lexerFlags

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
