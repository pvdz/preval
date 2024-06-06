# Preval test case

# for_regular.md

> Normalize > Blocks > For regular
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for ($(1); $(2); $(3)) $(4);
`````

## Pre Normal


`````js filename=intro
{
  $(1);
  while ($(2)) {
    $(4);
    $(3);
  }
}
`````

## Normalized


`````js filename=intro
$(1);
let tmpIfTest = $(2);
while (true) {
  if (tmpIfTest) {
    $(4);
    $(3);
    tmpIfTest = $(2);
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
  $(4);
  $(3);
  let tmpClusterSSA_tmpIfTest = $(2);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      $(4);
      $(3);
      tmpClusterSSA_tmpIfTest = $(2);
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
  $( 4 );
  $( 3 );
  let b = $( 2 );
  while ($LOOP_UNROLL_10) {
    if (b) {
      $( 4 );
      $( 3 );
      b = $( 2 );
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
 - 3: 4
 - 4: 3
 - 5: 2
 - 6: 4
 - 7: 3
 - 8: 2
 - 9: 4
 - 10: 3
 - 11: 2
 - 12: 4
 - 13: 3
 - 14: 2
 - 15: 4
 - 16: 3
 - 17: 2
 - 18: 4
 - 19: 3
 - 20: 2
 - 21: 4
 - 22: 3
 - 23: 2
 - 24: 4
 - 25: 3
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
