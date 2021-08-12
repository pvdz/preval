# Preval test case

# base_zero_bound.md

> Normalize > Loops > Base zero bound
>
> How do you do loops?

This is the simple case with a bound loop

#TODO

## Input

`````js filename=intro
function f() {
  for (let i=0; i<0; ++i) $(i);
  return 100;
}
const r = f();
$(r);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let i = 0;
    while (i < 0) {
      $(i);
      ++i;
    }
  }
  return 100;
};
const r = f();
$(r);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let i = 0;
  let tmpIfTest = i < 0;
  while (tmpIfTest) {
    $(i);
    i = i + 1;
    tmpIfTest = i < 0;
  }
  return 100;
};
const r = f();
$(r);
`````

## Output

`````js filename=intro
$(100);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
