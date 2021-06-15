# Preval test case

# regression2.md

> Conditional typing > Regression2
>
> wat

#TODO

## Input

`````js filename=intro
let curtype = 0;
const f = function () {
  debugger;
  const tmpIfTest = curtype === 16472;
  if (tmpIfTest) {
    curtype = $('random');
    undefined;
    const tmpIfTest$1 = curtype === 16473;
    if (tmpIfTest$1) {
      $('x');
      return undefined;
    } else {
      $('y');
      return undefined;
    }
  } else {
    $('a');
    return undefined;
  }
};
f();
f();
`````

## Pre Normal

`````js filename=intro
let curtype = 0;
const f = function () {
  debugger;
  const tmpIfTest = curtype === 16472;
  if (tmpIfTest) {
    curtype = $(`random`);
    undefined;
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

## Normalized

`````js filename=intro
let curtype = 0;
const f = function () {
  debugger;
  const tmpIfTest = curtype === 16472;
  if (tmpIfTest) {
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

## Output

`````js filename=intro
let curtype = 0;
const f = function () {
  debugger;
  const tmpIfTest = curtype === 16472;
  if (tmpIfTest) {
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

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
