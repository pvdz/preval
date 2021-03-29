# Preval test case

# odd_early_return2.md

> Normalize > Switch > Odd early return2
>
> Sorting out the branching stuff

#TODO

## Input

`````js filename=intro
const A = function () {
  if ($) {
    $(2);
  }
};

const f = function () {
  const B = function () {
    if ($) {
      const tmpReturnArg$3 = A();
      return tmpReturnArg$3;
    }
  };

  if ($) {
    const tmpReturnArg$53 = B();
    return tmpReturnArg$53;
  }
};

const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Pre Normal

`````js filename=intro
const A = function () {
  debugger;
  if ($) {
    $(2);
  }
};
const f = function () {
  debugger;
  const B = function () {
    debugger;
    if ($) {
      const tmpReturnArg$3 = A();
      return tmpReturnArg$3;
    }
  };
  if ($) {
    const tmpReturnArg$53 = B();
    return tmpReturnArg$53;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Normalized

`````js filename=intro
const A = function () {
  debugger;
  if ($) {
    $(2);
  }
};
const f = function () {
  debugger;
  const B = function () {
    debugger;
    if ($) {
      const tmpReturnArg$3 = A();
      return tmpReturnArg$3;
    }
  };
  if ($) {
    const tmpReturnArg$53 = B();
    return tmpReturnArg$53;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output

`````js filename=intro
const B = function () {
  debugger;
  if ($) {
    const tmpReturnArg$3 = A();
    return tmpReturnArg$3;
  }
};
const A = function () {
  debugger;
  if ($) {
    $(2);
  }
};
const f = function () {
  debugger;
  if ($) {
    const tmpReturnArg$53 = B();
    return tmpReturnArg$53;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
