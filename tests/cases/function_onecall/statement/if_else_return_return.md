# Preval test case

# if_else_return_return.md

> Function onecall > Statement > If else return return
>
> Return inlining

#TODO

## Input

`````js filename=intro
function f() {
  if ($()) {
    $(0);
  } else {
    return $(1);
  }
  return $(2);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($()) {
    $(0);
  } else {
    return $(1);
  }
  return $(2);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    $(0);
  } else {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  }
  const tmpReturnArg$1 = $(2);
  return tmpReturnArg$1;
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    $(0);
  } else {
    $(1);
    return undefined;
  }
  $(2);
  return undefined;
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
