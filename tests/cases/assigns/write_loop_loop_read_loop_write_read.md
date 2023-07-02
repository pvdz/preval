# Preval test case

# write_loop_loop_read_loop_write_read.md

> Assigns > Write loop loop read loop write read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    $(x, 'inner')
    if ($(true)) break
  }
  x = $(30);
}
$(x, 'outer');
`````

## Pre Normal

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    $(x, `inner`);
    if ($(true)) break;
  }
  x = $(30);
}
$(x, `outer`);
`````

## Normalized

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    $(x, `inner`);
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      break;
    } else {
    }
  }
  x = $(30);
}
$(x, `outer`);
`````

## Output

`````js filename=intro
let x = $(10);
while (true) {
  let $tmpLoopUnrollCheck = true;
  $(x, `inner`);
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $tmpLoopUnrollCheck = false;
  } else {
  }
  if ($tmpLoopUnrollCheck) {
    while ($LOOP_UNROLL_10) {
      $(x, `inner`);
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
        break;
      } else {
      }
    }
  } else {
  }
  x = $(30);
}
$(x, `outer`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10, 'inner'
 - 3: true
 - 4: 30
 - 5: 30, 'inner'
 - 6: true
 - 7: 30
 - 8: 30, 'inner'
 - 9: true
 - 10: 30
 - 11: 30, 'inner'
 - 12: true
 - 13: 30
 - 14: 30, 'inner'
 - 15: true
 - 16: 30
 - 17: 30, 'inner'
 - 18: true
 - 19: 30
 - 20: 30, 'inner'
 - 21: true
 - 22: 30
 - 23: 30, 'inner'
 - 24: true
 - 25: 30
 - 26: 30, 'inner'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
