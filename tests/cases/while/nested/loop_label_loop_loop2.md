# Preval test case

# loop_label_loop_loop2.md

> While > Nested > Loop label loop loop2
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
        while (true) {
          if ($) {
            break foo;
          }
        }
      } else {
        x = 20;
      }
      $(x);
    }
  }
  $(x); // This failed the trick because the outer loop now has >1 children
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
        while (true) {
          if ($) {
            break foo;
          }
        }
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
  foo: {
    while (true) {
      const t = $(x);
      if (t) {
        while (true) {
          if ($) {
            break foo;
          } else {
          }
        }
      } else {
        x = 20;
      }
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
  foo: {
    while (true) {
      const t /*:unknown*/ = $(x);
      if (t) {
        while (true) {
          if ($) {
            break foo;
          } else {
          }
        }
      } else {
        x = 20;
      }
      $(x);
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
  foo: {
    while (true) {
      const b = $( a );
      if (b) {
        while (true) {
          if ($) {
            break foo;
          }
        }
      }
      else {
        a = 20;
      }
      $( a );
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
