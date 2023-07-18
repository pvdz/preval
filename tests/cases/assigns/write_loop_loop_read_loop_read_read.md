# Preval test case

# write_loop_loop_read_loop_read_read.md

> Assigns > Write loop loop read loop read read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    $(x, 'inner');
    if ($(true)) break
  }
  $(x, 'middle');
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
  $(x, `middle`);
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
  $(x, `middle`);
}
$(x, `outer`);
`````

## Output

`````js filename=intro
const x = $(10);
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
  $(x, `middle`);
}
$(x, `outer`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
while (true) {
  let b = true;
  $( a, "inner" );
  const c = $( true );
  if (c) {
    b = false;
  }
  if (b) {
    while ($LOOP_UNROLL_10) {
      $( a, "inner" );
      const d = $( true );
      if (d) {
        break;
      }
    }
  }
  $( a, "middle" );
}
$( a, "outer" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10, 'inner'
 - 3: true
 - 4: 10, 'middle'
 - 5: 10, 'inner'
 - 6: true
 - 7: 10, 'middle'
 - 8: 10, 'inner'
 - 9: true
 - 10: 10, 'middle'
 - 11: 10, 'inner'
 - 12: true
 - 13: 10, 'middle'
 - 14: 10, 'inner'
 - 15: true
 - 16: 10, 'middle'
 - 17: 10, 'inner'
 - 18: true
 - 19: 10, 'middle'
 - 20: 10, 'inner'
 - 21: true
 - 22: 10, 'middle'
 - 23: 10, 'inner'
 - 24: true
 - 25: 10, 'middle'
 - 26: 10, 'inner'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
