# Preval test case

# while_no.md

> Last write analysis > While no
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

#TODO

## Input

`````js filename=intro
let x = $('a');
$(x);
// Can SSA this because the loop does not write to it
x = $('b');
while (true) {
  if ($) {
    $('123')
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
    $(`123`);
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
    $(`123`);
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
const tmpClusterSSA_x = $(`b`);
let $tmpLoopUnrollCheck = true;
if ($) {
  $(`123`);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if ($) {
      $(`123`);
    } else {
      break;
    }
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
 - 4: '123'
 - 5: '123'
 - 6: '123'
 - 7: '123'
 - 8: '123'
 - 9: '123'
 - 10: '123'
 - 11: '123'
 - 12: '123'
 - 13: '123'
 - 14: '123'
 - 15: '123'
 - 16: '123'
 - 17: '123'
 - 18: '123'
 - 19: '123'
 - 20: '123'
 - 21: '123'
 - 22: '123'
 - 23: '123'
 - 24: '123'
 - 25: '123'
 - 26: '123'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
