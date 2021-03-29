# Preval test case

# two2.md

> Normalize > Defaults > Two2
>
> Rewrite function param defaults to equivalent body code

Regression was accidentally dropping functions when the outer function was cloned.

The double references are probably to prevent inlining them outright. Same for the [x] bit. At the time of writing, anyways.

The problem was that outer was being cloned with a primitive. This clone was declared, called, and its call subsequently eliminated. Then another call to this function was being inlined with the same primitive. It used the cloning cache and assumed the function existed. But since that's not checked, the process was compiling a function call to a function taht no longer existed.

## Input

`````js filename=intro
const outer = function (x) {
  const r = [x];
  $(r);
};
let main = function () {
  const inner = function (x) {
    outer();
    if ($) {
      outer(x);
    }
  };

  inner();
  if ($) {
    inner();
  }
};
const tmpCalleeParam = main();
$(tmpCalleeParam);
`````

## Pre Normal

`````js filename=intro
const outer = function ($$0) {
  let x = $$0;
  debugger;
  const r = [x];
  $(r);
};
let main = function () {
  debugger;
  const inner = function ($$0) {
    let x$1 = $$0;
    debugger;
    outer();
    if ($) {
      outer(x$1);
    }
  };
  inner();
  if ($) {
    inner();
  }
};
const tmpCalleeParam = main();
$(tmpCalleeParam);
`````

## Normalized

`````js filename=intro
const outer = function ($$0) {
  let x = $$0;
  debugger;
  const r = [x];
  $(r);
};
let main = function () {
  debugger;
  const inner = function ($$0) {
    let x$1 = $$0;
    debugger;
    outer();
    if ($) {
      outer(x$1);
    }
  };
  inner();
  if ($) {
    inner();
  }
};
const tmpCalleeParam = main();
$(tmpCalleeParam);
`````

## Output

`````js filename=intro
const $clone$inner$0_Iundefined = function () {
  debugger;
  $clone$outer$0_Iundefined();
  if ($) {
    $clone$outer$0_Iundefined();
  }
};
const $clone$outer$0_Iundefined = function () {
  debugger;
  const r$1 = [undefined];
  $(r$1);
};
const main = function () {
  debugger;
  $clone$inner$0_Iundefined();
  if ($) {
    $clone$inner$0_Iundefined();
  }
};
const tmpCalleeParam = main();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [undefined]
 - 2: [undefined]
 - 3: [undefined]
 - 4: [undefined]
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same