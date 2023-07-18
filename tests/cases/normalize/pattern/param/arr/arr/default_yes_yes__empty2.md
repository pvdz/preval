# Preval test case

# default_yes_yes__empty2.md

> Normalize > Pattern > Param > Arr > Arr > Default yes yes  empty2
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

This test is (was) showing a regression where X became `undefined` so it was doing `[...undefined]`. And I didn't know why.

The problem turned out to be that the code ends up inlining the `e` function here, leaving the `X = A` assignment to be after the `if` statement.

Then, when the tail is abstracted, the bindings are passed on and renamed inside.

This means the assignment no longer hits the closure, but only the local renamed variable.

Then later this is causing the value to be set to undefined thanks to the "hoisting fix".

Soooooo.... that's pretty meh.

#TODO

## Input

`````js filename=intro
const f = function (tmpParamBare) {
  const a = function () {
    const A = ['pass3'];
    const e = function () {
      X = A;
      d(A);
    };
    const d = function () {
      [...X];
    };
    if (A) {
      e(A);
    } else {
      d();
    }
  };
  let X = undefined;
  const N = true;
  if (N) {
    return a();
  } else {
  }
};
$(f());
`````

## Pre Normal

`````js filename=intro
const f = function ($$0) {
  let tmpParamBare = $$0;
  debugger;
  const a = function () {
    debugger;
    const A = [`pass3`];
    const e = function () {
      debugger;
      X = A;
      d(A);
    };
    const d = function () {
      debugger;
      [...X];
    };
    if (A) {
      e(A);
    } else {
      d();
    }
  };
  let X = undefined;
  const N = true;
  if (N) {
    return a();
  } else {
  }
};
$(f());
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  let tmpParamBare = $$0;
  debugger;
  const a = function () {
    debugger;
    const A = [`pass3`];
    const e = function () {
      debugger;
      X = A;
      d(A);
      return undefined;
    };
    const d = function () {
      debugger;
      [...X];
      return undefined;
    };
    if (A) {
      e(A);
      return undefined;
    } else {
      d();
      return undefined;
    }
  };
  let X = undefined;
  const N = true;
  if (N) {
    const tmpReturnArg = a();
    return tmpReturnArg;
  } else {
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
