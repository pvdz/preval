# Preval test case

# while_yes.md

> Last write analysis > While yes
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

#TODO

## Input

`````js filename=intro
// Should be able to rename the binding since this write can only be observed by the next read
let x = $('a');
$(x);
// Can not SSA this because the loop writes to it, too
x = $('b');
while (true) {
  if ($) {
    x = $('c');
  } else {
    break;  
  }
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
while (true) {
  if ($) {
    x = $(`c`);
  } else {
    break;
  }
}
$(x);
`````

## Normalized

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
while (true) {
  if ($) {
    x = $(`c`);
  } else {
    break;
  }
}
$(x);
`````

## Output

`````js filename=intro
const x = $(`a`);
$(x);
let tmpClusterSSA_x = $(`b`);
if ($) {
  tmpClusterSSA_x = $(`c`);
  if ($) {
    while ($LOOP_UNROLL_10) {
      if ($) {
        tmpClusterSSA_x = $(`c`);
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
$(tmpClusterSSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 'c'
 - 5: 'c'
 - 6: 'c'
 - 7: 'c'
 - 8: 'c'
 - 9: 'c'
 - 10: 'c'
 - 11: 'c'
 - 12: 'c'
 - 13: 'c'
 - 14: 'c'
 - 15: 'c'
 - 16: 'c'
 - 17: 'c'
 - 18: 'c'
 - 19: 'c'
 - 20: 'c'
 - 21: 'c'
 - 22: 'c'
 - 23: 'c'
 - 24: 'c'
 - 25: 'c'
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
