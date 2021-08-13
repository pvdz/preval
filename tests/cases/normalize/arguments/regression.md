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

## Pre Normal

`````js filename=intro
const f = function ($$0) {
  let x1 = $$0;
  debugger;
  let x = undefined;
  if ($) {
    x = {};
  }
  const g = function () {
    const tmpPrevalAliasArgumentsLen = arguments.length;
    debugger;
    $(tmpPrevalAliasArgumentsLen);
  };
  return g();
};
$(f());
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  let x1 = $$0;
  debugger;
  let x = undefined;
  if ($) {
    x = {};
  } else {
  }
  const g = function () {
    const tmpPrevalAliasArgumentsLen = arguments.length;
    debugger;
    $(tmpPrevalAliasArgumentsLen);
    return undefined;
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
$(0);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
