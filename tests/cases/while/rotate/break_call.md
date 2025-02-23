# Preval test case

# break_call.md

> While > Rotate > Break call
>
> Rotating statements in a loop that breaks once

## Input

`````js filename=intro
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const end = $();
  if (end) {
    break;
  } else {
    $(1);
  }
}
`````

## Pre Normal


`````js filename=intro
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const end = $();
  if (end) {
    break;
  } else {
    $(1);
  }
}
`````

## Normalized


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  const end = $();
  if (end) {
    break;
  } else {
  }
}
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  const end /*:unknown*/ = $();
  if (end) {
    break;
  } else {
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  const a = $();
  if (a) {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 
 - 3: 1
 - 4: 
 - 5: 1
 - 6: 
 - 7: 1
 - 8: 
 - 9: 1
 - 10: 
 - 11: 1
 - 12: 
 - 13: 1
 - 14: 
 - 15: 1
 - 16: 
 - 17: 1
 - 18: 
 - 19: 1
 - 20: 
 - 21: 1
 - 22: 
 - 23: 1
 - 24: 
 - 25: 1
 - 26: 
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
