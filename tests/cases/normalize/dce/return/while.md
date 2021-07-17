# Preval test case

# while.md

> Normalize > Dce > Return > While
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    return $(1, 'return');
    $('fail');
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  while ($(true)) {
    return $(1, `return`);
    $(`fail`);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let tmpIfTest = $(true);
  while (tmpIfTest) {
    const tmpReturnArg = $(1, `return`);
    return tmpReturnArg;
  }
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
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    while (true) {
      const tmpReturnArg = $(1, `return`);
      return tmpReturnArg;
    }
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1, 'return'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
