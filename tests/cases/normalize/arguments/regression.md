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
    const tmpPrevalAliasArgumentsLen = arguments.length;
    $(tmpPrevalAliasArgumentsLen);
  };
  const tmpReturnArg = g();
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const g = function () {
    const tmpPrevalAliasArgumentsLen = arguments.length;
    $(tmpPrevalAliasArgumentsLen);
  };
  const tmpReturnArg = g();
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
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
