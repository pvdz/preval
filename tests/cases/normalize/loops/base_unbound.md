# Preval test case

# base_unbound.md

> Normalize > Loops > Base unbound
>
> How do you do loops?

This is the simple case with an infinite loop

#TODO

## Input

`````js filename=intro
function f() {
  for (let i=0; i<Infinity; ++i) $(i);
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
    while (i < Infinity) {
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
  let tmpIfTest = i < Infinity;
  while (true) {
    if (tmpIfTest) {
      $(i);
      i = i + 1;
      tmpIfTest = i < Infinity;
    } else {
      break;
    }
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
$(10);
let i = 11;
let tmpIfTest = true;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (tmpIfTest) {
    $(i);
    i = i + 1;
    tmpIfTest = i < Infinity;
  } else {
    break;
  }
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
