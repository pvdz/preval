# Preval test case

# backtoback_same_ident_if_return_false_false.md

> Normalize > If > Backtoback same ident if return false false
>
> Back to back if on same ident where first if has empty consequent and second if only has a return as consequent.

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(0);
  if (x) {
  
  } else {
    x = $(0);
  }
  if (x) {
    return x;
  } else {
    return $(3);
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
  } else {
    x = $(0);
  }
  if (x) {
    return x;
  } else {
    return $(3);
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
    return x;
  } else {
    x = $(0);
    if (x) {
      return x;
    } else {
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    }
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
    return x;
  } else {
    const tmpSSA_x = $(0);
    if (tmpSSA_x) {
      return tmpSSA_x;
    } else {
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    }
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
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
