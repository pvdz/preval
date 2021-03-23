# Preval test case

# base.md

> Normalize > Arrow > Base
>
> Simple arrow case

#TODO

## Input

`````js filename=intro
const f = () => $(1);
f();
`````

## Pre Normal

`````js filename=intro
const f = () => {
  debugger;
  return $(1);
};
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
f();
`````

## Output

`````js filename=intro
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
