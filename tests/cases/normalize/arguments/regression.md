# Preval test case

# regression.md

> Normalize > Arguments > Regression
>
> Regression that was leading to a crash due to arguments.length. The outer func was mandatory, as was the param default

#TODO

## Input

`````js filename=intro
const f = function(x1) {
  let x = undefined;
  if ($) {
    x = {};
  } 
  const g = function() {
    $(arguments.length)
  }
  return g();
}
$(f());
`````

## Normalized

`````js filename=intro
const f = function (x1) {
  let x = undefined;
  if ($) {
    x = {};
  }
  const g = function () {
    const tmpCallCallee = $;
    const tmpCalleeParam = arguments.length;
    tmpCallCallee(tmpCalleeParam);
  };
  const tmpReturnArg = g();
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function (x1) {
  const g = function () {
    const tmpCalleeParam = arguments.length;
    $(tmpCalleeParam);
  };
  const tmpReturnArg = g();
  return tmpReturnArg;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
