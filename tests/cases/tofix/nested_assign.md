# Preval test case

# nested_assign.md

> Tofix > Nested assign
>
> The nested assign of $(20) is not observed by x so the assignment can be removed in favor of just the rhs.

#TODO

## Input

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    x = $(20);
    if ($(true)) break
  }
  x = $(30);
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    x = $(20);
    if ($(true)) break;
  }
  x = $(30);
}
$(x);
`````

## Normalized

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    x = $(20);
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      break;
    } else {
    }
  }
  x = $(30);
}
$(x);
`````

## Output

`````js filename=intro
let x = $(10);
while (true) {
  let $tmpLoopUnrollCheck = true;
  x = $(20);
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $tmpLoopUnrollCheck = false;
  } else {
  }
  if ($tmpLoopUnrollCheck) {
    while ($LOOP_UNROLL_10) {
      x = $(20);
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
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 10 );
while (true) {
  let b = true;
  a = $( 20 );
  const c = $( true );
  if (c) {
    b = false;
  }
  if (b) {
    while ($LOOP_UNROLL_10) {
      a = $( 20 );
      const d = $( true );
      if (d) {
        break;
      }
    }
  }
  a = $( 30 );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: true
 - 4: 30
 - 5: 20
 - 6: true
 - 7: 30
 - 8: 20
 - 9: true
 - 10: 30
 - 11: 20
 - 12: true
 - 13: 30
 - 14: 20
 - 15: true
 - 16: 30
 - 17: 20
 - 18: true
 - 19: 30
 - 20: 20
 - 21: true
 - 22: 30
 - 23: 20
 - 24: true
 - 25: 30
 - 26: 20
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same