# Preval test case

# for2_1.md

> Labels > For2 1
>
> If the sub-statement of a label is a loop then it should not become a block since that would be a syntax error with labeled continue.

#TODO

## Input

`````js filename=intro
$(0);
foo: for(;$(true);) {
  if ($(0)) break foo;
  else continue foo;
}
$(2);
`````

## Pre Normal


`````js filename=intro
$(0);
foo: {
  while ($(true)) {
    {
      $continue: {
        {
          if ($(0)) break foo;
          else break $continue;
        }
      }
    }
  }
}
$(2);
`````

## Normalized


`````js filename=intro
$(0);
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $continue: {
      const tmpIfTest$1 = $(0);
      if (tmpIfTest$1) {
        break;
      } else {
        break $continue;
      }
    }
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(2);
`````

## Output


`````js filename=intro
$(0);
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 = $(0);
  if (tmpIfTest$1) {
  } else {
    let tmpClusterSSA_tmpIfTest = $(true);
    while ($LOOP_UNROLL_10) {
      if (tmpClusterSSA_tmpIfTest) {
        const tmpIfTest$2 = $(0);
        if (tmpIfTest$2) {
          break;
        } else {
          tmpClusterSSA_tmpIfTest = $(true);
        }
      } else {
        break;
      }
    }
  }
} else {
}
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
const a = $( true );
if (a) {
  const b = $( 0 );
  if (b) {

  }
  else {
    let c = $( true );
    while ($LOOP_UNROLL_10) {
      if (c) {
        const d = $( 0 );
        if (d) {
          break;
        }
        else {
          c = $( true );
        }
      }
      else {
        break;
      }
    }
  }
}
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: true
 - 3: 0
 - 4: true
 - 5: 0
 - 6: true
 - 7: 0
 - 8: true
 - 9: 0
 - 10: true
 - 11: 0
 - 12: true
 - 13: 0
 - 14: true
 - 15: 0
 - 16: true
 - 17: 0
 - 18: true
 - 19: 0
 - 20: true
 - 21: 0
 - 22: true
 - 23: 0
 - 24: true
 - 25: 0
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
