# Preval test case

# counter_update_0.md

> Unwind loops > Separate test > Counter update 0
>
> Unrolling loops

## Input

`````js filename=intro
const max = $(10);
for (let i=0; i<10; i += 0) $(i);
`````

## Pre Normal


`````js filename=intro
const max = $(10);
{
  let i = 0;
  while (i < 10) {
    $(i);
    i += 0;
  }
}
`````

## Normalized


`````js filename=intro
const max = $(10);
let i = 0;
while (true) {
  const tmpIfTest = i < 10;
  if (tmpIfTest) {
    $(i);
    i = i + 0;
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
$(10);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
let tmpClusterSSA_i$2 = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$1 = tmpClusterSSA_i$2 < 10;
  if (tmpIfTest$1) {
    $(tmpClusterSSA_i$2);
    tmpClusterSSA_i$2 = tmpClusterSSA_i$2 + 0;
  } else {
    break;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
let a = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a < 10;
  if (b) {
    $( a );
    a = a + 0;
  }
  else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: 0
 - 6: 0
 - 7: 0
 - 8: 0
 - 9: 0
 - 10: 0
 - 11: 0
 - 12: 0
 - 13: 0
 - 14: 0
 - 15: 0
 - 16: 0
 - 17: 0
 - 18: 0
 - 19: 0
 - 20: 0
 - 21: 0
 - 22: 0
 - 23: 0
 - 24: 0
 - 25: 0
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
