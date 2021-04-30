# Preval test case

# if-vars.md

> Normalize > Return > If-vars
>
> When the if branch ends with an update to the binding that is returned afterwards, return it immediately.

#TODO

## Input

`````js filename=intro
function f() {
  let x = undefined;
  if ($(1)) {
    x = $(1, 'a');
  }
  return x;
}
$(f(), 'result');
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  if ($(1)) {
    x = $(1, 'a');
  }
  return x;
};
$(f(), 'result');
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    x = $(1, 'a');
    return x;
  } else {
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = 'result';
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpSSA_x = $(1, 'a');
    return tmpSSA_x;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam, 'result');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 'a'
 - 3: 1, 'result'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
