# Preval test case

# base_one_bound.md

> Normalize > Loops > Base one bound
>
> How do you do loops?

This is the simple case with a bound loop

#TODO

## Input

`````js filename=intro
function f() {
  for (let i=0; i<1; ++i) $(i);
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
    while (i < 1) {
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
  let tmpIfTest = i < 1;
  while (tmpIfTest) {
    $(i);
    i = i + 1;
    tmpIfTest = i < 1;
  }
  return 100;
};
const r = f();
$(r);
`````

## Output

`````js filename=intro
$(0);
let tmpClusterSSA_i = 1;
let tmpClusterSSA_tmpIfTest = false;
while (tmpClusterSSA_tmpIfTest) {
  $(tmpClusterSSA_i);
  tmpClusterSSA_i = tmpClusterSSA_i + 1;
  tmpClusterSSA_tmpIfTest = tmpClusterSSA_i < 1;
}
$(100);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
