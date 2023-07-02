# Preval test case

# labeled.md

> Normalize > Dowhile > Labeled
>
> We transform do-while to regular while

A labeled continue requires the label to be a direct parent of a loop. So the do transform must not break this contract.

That's what this test is for.

#TODO

## Input

`````js filename=intro
foo: do {
  $(1);
  continue foo;
} while ($(2));
`````

## Pre Normal

`````js filename=intro
dropme: {
  let tmpDoWhileFlag = true;
  foo: while (tmpDoWhileFlag || $(2)) {
    tmpDoWhileFlag = false;
    $(1);
    continue foo;
  }
}
`````

## Normalized

`````js filename=intro
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    tmpIfTest = $(2);
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(1);
    continue;
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
$(1);
let $tmpLoopUnrollCheck = true;
const tmpIfTest$1 = $(2);
if (tmpIfTest$1) {
  $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    const tmpIfTest$2 = $(2);
    if (tmpIfTest$2) {
      $(1);
    } else {
      break;
    }
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
