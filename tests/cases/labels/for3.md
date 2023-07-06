# Preval test case

# for3.md

> Labels > For3
>
> If the sub-statement of a label is a loop then it should not become a block since that would be a syntax error with labeled continue.

#TODO

## Input

`````js filename=intro
$(0);
foo: for(;$(true);) {
  if ($()) break foo;
  else continue foo;
}
$(2);
`````

## Pre Normal

`````js filename=intro
$(0);
dropme: {
  foo: while ($(true)) {
    {
      if ($()) break foo;
      else continue foo;
    }
  }
}
$(2);
`````

## Normalized

`````js filename=intro
$(0);
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpIfTest$1 = $();
    if (tmpIfTest$1) {
      break;
    } else {
      continue;
    }
  } else {
    break;
  }
}
$(2);
`````

## Output

`````js filename=intro
$(0);
let $tmpLoopUnrollCheck = $LOOP_UNROLL_10;
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 = $();
  if (tmpIfTest$1) {
    $tmpLoopUnrollCheck = false;
  } else {
  }
} else {
  $tmpLoopUnrollCheck = false;
}
while ($tmpLoopUnrollCheck) {
  const tmpIfTest$2 = $(true);
  if (tmpIfTest$2) {
    const tmpIfTest$4 = $();
    if (tmpIfTest$4) {
      break;
    } else {
    }
  } else {
    break;
  }
}
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: true
 - 3: 
 - 4: true
 - 5: 
 - 6: true
 - 7: 
 - 8: true
 - 9: 
 - 10: true
 - 11: 
 - 12: true
 - 13: 
 - 14: true
 - 15: 
 - 16: true
 - 17: 
 - 18: true
 - 19: 
 - 20: true
 - 21: 
 - 22: true
 - 23: 
 - 24: true
 - 25: 
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
