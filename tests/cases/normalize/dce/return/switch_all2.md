# Preval test case

# switch_all2.md

> Normalize > Dce > Return > Switch all2
>
> Any statements that follow a return in the same parent should be eliminated.

This case uncovered a problem where fresh bindings up to the label would end up being params and local consts, causing a crash.

#TODO

## Input

`````js filename=intro
let f = function () {
  const tmpSwitchValue = 1;
  tmpSwitchBreak: {
    return
  }
  2;
};
$(f());

`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = 1;
  tmpSwitchBreak: {
    return;
  }
  2;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = 1;
  const tmpLabeledBlockFunc = function ($$0) {
    let tmpSwitchValue$3 = $$0;
    debugger;
    return undefined;
  };
  const tmpAfterLabel = function ($$0) {
    let tmpSwitchValue$1 = $$0;
    debugger;
    return undefined;
  };
  const tmpReturnArg = tmpLabeledBlockFunc(tmpSwitchValue);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined);
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
