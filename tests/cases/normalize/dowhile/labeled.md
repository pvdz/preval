# Preval test case

# labeled.md

> Normalize > Dowhile > Labeled
>
> We transform do-while to regular while

A labeled continue requires the label to be a direct parent of a loop. So the do transform must not break this contract.

That's what this test is for.

## Input

`````js filename=intro
foo: do {
  $(1);
  continue foo;
} while ($(2));
`````

## Pre Normal


`````js filename=intro
foo: while (true) {
  {
    $continue: {
      {
        $(1);
        break $continue;
      }
    }
  }
  if ($(2)) {
  } else {
    break;
  }
}
`````

## Normalized


`````js filename=intro
while (true) {
  $(1);
  const tmpIfTest = $(2);
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
$(1);
const tmpIfTest = $(2);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
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
$( 1 );
const a = $( 2 );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const b = $( 2 );
    if (b) {

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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
