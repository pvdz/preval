# Preval test case

# regression.md

> One timers > Regression
>
> Some kind of regression

#TODO

## Input

`````js filename=intro
const f = function (x, y) {
  $();
  const tmpReturnArg = g(x, y);
  return tmpReturnArg;
};
const g = function () {
  if ($) {
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  }
};
const h = function (z) {
  const t = z | 4096;
  f(t);
};
h();
`````

## Pre Normal

`````js filename=intro
const f = function ($$0, $$1) {
  let x = $$0;
  let y = $$1;
  debugger;
  $();
  const tmpReturnArg = g(x, y);
  return tmpReturnArg;
};
const g = function () {
  debugger;
  if ($) {
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  }
};
const h = function ($$0) {
  let z = $$0;
  debugger;
  const t = z | 4096;
  f(t);
};
h();
`````

## Normalized

`````js filename=intro
const f = function ($$0, $$1) {
  let x = $$0;
  let y = $$1;
  debugger;
  $();
  const tmpReturnArg = g(x, y);
  return tmpReturnArg;
};
const g = function () {
  debugger;
  if ($) {
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  } else {
    return undefined;
  }
};
const h = function ($$0) {
  let z = $$0;
  debugger;
  const t = z | 4096;
  f(t);
  return undefined;
};
h();
`````

## Output

`````js filename=intro
$();
if ($) {
  $();
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
$();
if ($) {
  $();
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
