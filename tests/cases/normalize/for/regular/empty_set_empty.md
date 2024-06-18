# Preval test case

# empty_set_empty.md

> Normalize > For > Regular > Empty set empty
>
> Regular for-loop

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for (; b; ) $(d);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2,
  c = 3,
  d = 4;
{
  while (b) {
    $(d);
  }
}
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
while (true) {
  if (b) {
    $(d);
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(4);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 4 );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 4
 - 2: 4
 - 3: 4
 - 4: 4
 - 5: 4
 - 6: 4
 - 7: 4
 - 8: 4
 - 9: 4
 - 10: 4
 - 11: 4
 - 12: 4
 - 13: 4
 - 14: 4
 - 15: 4
 - 16: 4
 - 17: 4
 - 18: 4
 - 19: 4
 - 20: 4
 - 21: 4
 - 22: 4
 - 23: 4
 - 24: 4
 - 25: 4
 - 26: 4
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
