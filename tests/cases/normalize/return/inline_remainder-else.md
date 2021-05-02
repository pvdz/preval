# Preval test case

# inline_remainder-else.md

> Normalize > Return > Inline remainder-else
>
> If one branch returns early the remainder of the parent block should be inlined after the other branch.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    $(2);
  } else {
    $(3);
    return $(4);
  }
  $(5);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    $(2);
  } else {
    $(3);
    return $(4);
  }
  $(5);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(2);
  } else {
    $(3);
    const tmpReturnArg = $(4);
    return tmpReturnArg;
  }
  $(5);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(2);
    $(5);
    return undefined;
  } else {
    $(3);
    const tmpReturnArg = $(4);
    return tmpReturnArg;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 5
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
