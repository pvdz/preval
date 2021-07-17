# Preval test case

# while.md

> Normalize > Dce > Throw > While
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    throw $(1, 'return');
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
    throw $(1, `return`);
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
    const tmpThrowArg = $(1, `return`);
    throw tmpThrowArg;
  }
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  while (true) {
    const tmpThrowArg = $(1, `return`);
    throw tmpThrowArg;
  }
} else {
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1, 'return'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
