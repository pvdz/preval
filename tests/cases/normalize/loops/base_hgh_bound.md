# Preval test case

# base_hgh_bound.md

> Normalize > Loops > Base hgh bound
>
> How do you do loops?

This case should cap the inlining at some point even if the loop doesn't go all the way to infinity

#TODO

## Input

`````js filename=intro
function f() {
  for (let i=0; i<1e9; ++i) $(i);
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
    while (i < 1000000000) {
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
  let tmpIfTest = i < 1000000000;
  while (tmpIfTest) {
    $(i);
    i = i + 1;
    tmpIfTest = i < 1000000000;
  }
  return 100;
};
const r = f();
$(r);
`````

## Output

`````js filename=intro
$(0);
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
$(7);
$(8);
$(9);
let tmpClusterSSA_i$17 = 10;
let tmpClusterSSA_tmpIfTest$17 = true;
while (tmpClusterSSA_tmpIfTest$17) {
  $(tmpClusterSSA_i$17);
  tmpClusterSSA_i$17 = tmpClusterSSA_i$17 + 1;
  tmpClusterSSA_tmpIfTest$17 = tmpClusterSSA_i$17 < 1000000000;
}
$(100);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: 5
 - 7: 6
 - 8: 7
 - 9: 8
 - 10: 9
 - 11: 10
 - 12: 11
 - 13: 12
 - 14: 13
 - 15: 14
 - 16: 15
 - 17: 16
 - 18: 17
 - 19: 18
 - 20: 19
 - 21: 20
 - 22: 21
 - 23: 22
 - 24: 23
 - 25: 24
 - 26: 25
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same