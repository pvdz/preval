# Preval test case

# if_else_return_return.md

> Function onecall > Var > If else return return
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
const x = f();
$(x);
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
const x = f();
$(x);
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
const x = f();
$(x);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    $(0);
    const tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  }
};
const x = f();
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
