# Preval test case

# loop_label_loop.md

> While > Nested > Loop label loop
>
>

## Input

`````js filename=intro
let x = 10;
while(true) {
  foo: {
    while (true) {
      const t = $(x);
      if (t) {
        break foo;
      } else {
        x = 20;
      }
      $(x);
    }
  }
  $(x);
}
`````

## Pre Normal


`````js filename=intro
let x = 10;
while (true) {
  foo: {
    while (true) {
      const t = $(x);
      if (t) {
        break foo;
      } else {
        x = 20;
      }
      $(x);
    }
  }
  $(x);
}
`````

## Normalized


`````js filename=intro
let x = 10;
while (true) {
  while (true) {
    const t = $(x);
    if (t) {
      break;
    } else {
      x = 20;
      $(x);
    }
  }
  $(x);
}
`````

## Output


`````js filename=intro
let x /*:number*/ = 10;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const t = $(x);
  if (t) {
  } else {
    x = 20;
    while ($LOOP_UNROLL_10) {
      $(20);
      const t$1 = $(20);
      if (t$1) {
        break;
      } else {
      }
    }
  }
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 10;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = $( a );
  if (b) {

  }
  else {
    a = 20;
    while ($LOOP_UNROLL_10) {
      $( 20 );
      const c = $( 20 );
      if (c) {
        break;
      }
    }
  }
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - 3: 10
 - 4: 10
 - 5: 10
 - 6: 10
 - 7: 10
 - 8: 10
 - 9: 10
 - 10: 10
 - 11: 10
 - 12: 10
 - 13: 10
 - 14: 10
 - 15: 10
 - 16: 10
 - 17: 10
 - 18: 10
 - 19: 10
 - 20: 10
 - 21: 10
 - 22: 10
 - 23: 10
 - 24: 10
 - 25: 10
 - 26: 10
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
