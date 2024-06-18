# Preval test case

# redundant_label_while.md

> Normalize > Continue > Redundant label while
>
> If a labeled break does the same thing without the label then the label should be dropped

## Input

`````js filename=intro
let x = $(2);
exit: while (x) {
  $(1);
  
  if ($(1)) {
    x = $(3);
  }
  if (x) {
    continue exit;
  } else {
    x = $(4);
  }
}
`````

## Pre Normal


`````js filename=intro
let x = $(2);
exit: while (x) {
  $continue: {
    {
      $(1);
      if ($(1)) {
        x = $(3);
      }
      if (x) {
        break $continue;
      } else {
        x = $(4);
      }
    }
  }
}
`````

## Normalized


`````js filename=intro
let x = $(2);
while (true) {
  if (x) {
    $continue: {
      $(1);
      const tmpIfTest = $(1);
      if (tmpIfTest) {
        x = $(3);
      } else {
      }
      if (x) {
        break $continue;
      } else {
        x = $(4);
      }
    }
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
let x = $(2);
if (x) {
  $(1);
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    x = $(3);
  } else {
  }
  if (x) {
  } else {
    x = $(4);
  }
  while ($LOOP_UNROLL_10) {
    if (x) {
      $(1);
      const tmpIfTest$1 = $(1);
      if (tmpIfTest$1) {
        x = $(3);
      } else {
      }
      if (x) {
      } else {
        x = $(4);
      }
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 2 );
if (a) {
  $( 1 );
  const b = $( 1 );
  if (b) {
    a = $( 3 );
  }
  if (a) {

  }
  else {
    a = $( 4 );
  }
  while ($LOOP_UNROLL_10) {
    if (a) {
      $( 1 );
      const c = $( 1 );
      if (c) {
        a = $( 3 );
      }
      if (a) {

      }
      else {
        a = $( 4 );
      }
    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 1
 - 3: 1
 - 4: 3
 - 5: 1
 - 6: 1
 - 7: 3
 - 8: 1
 - 9: 1
 - 10: 3
 - 11: 1
 - 12: 1
 - 13: 3
 - 14: 1
 - 15: 1
 - 16: 3
 - 17: 1
 - 18: 1
 - 19: 3
 - 20: 1
 - 21: 1
 - 22: 3
 - 23: 1
 - 24: 1
 - 25: 3
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
