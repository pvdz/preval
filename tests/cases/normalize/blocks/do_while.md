# Preval test case

# do_while.md

> Normalize > Blocks > Do while
>
> Add blocks to sub-statements

## Input

`````js filename=intro
do $(1);
while ($(2));
`````

## Pre Normal

`````js filename=intro
while (true) {
  $(1);
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
let $tmpLoopUnrollCheck = true;
$(1);
const tmpIfTest = $(2);
if (tmpIfTest) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
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
let a = true;
$( 1 );
const b = $( 2 );
if (b) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const c = $( 2 );
    if (c) {

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
