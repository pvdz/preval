# Preval test case

# backtoback_same_ident_else_return_false_true.md

> Normalize > If > Backtoback same ident else return false true
>
> Back to back if on same ident where first if has empty consequent and second if only has a return as consequent.

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(0);
  if (x) {
    x = $(1);
  } else {
  
  }
  if (x) {
    return $(3);
  } else {
    return x;
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = $(0);
  if (x) {
    x = $(1);
  } else {
  }
  if (x) {
    return $(3);
  } else {
    return x;
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = $(0);
  if (x) {
    x = $(1);
    if (x) {
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    } else {
      return x;
    }
  } else {
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const x = $(0);
  if (x) {
    const tmpSSA_x = $(1);
    if (tmpSSA_x) {
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    } else {
      return tmpSSA_x;
    }
  } else {
    return x;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
