# Preval test case

# with_break.md

> If update test > With break
>
> This covered the true_alt_falsy_empty_alt case

## Input

`````js filename=intro
let count = true;
let chk = $(true);
if (chk) {
} else {
  count = false;
}
while (count) {
  $('inside');
}
`````

## Pre Normal


`````js filename=intro
let count = true;
let chk = $(true);
if (chk) {
} else {
  count = false;
}
while (count) {
  $(`inside`);
}
`````

## Normalized


`````js filename=intro
let count = true;
let chk = $(true);
if (chk) {
} else {
  count = false;
}
while (true) {
  if (count) {
    $(`inside`);
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const chk = $(true);
if (chk) {
  $(`inside`);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(`inside`);
  }
  throw `[preval] unreachable; infinite loop`;
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "inside" );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( "inside" );
  }
  throw "[preval] unreachable; infinite loop";
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'inside'
 - 3: 'inside'
 - 4: 'inside'
 - 5: 'inside'
 - 6: 'inside'
 - 7: 'inside'
 - 8: 'inside'
 - 9: 'inside'
 - 10: 'inside'
 - 11: 'inside'
 - 12: 'inside'
 - 13: 'inside'
 - 14: 'inside'
 - 15: 'inside'
 - 16: 'inside'
 - 17: 'inside'
 - 18: 'inside'
 - 19: 'inside'
 - 20: 'inside'
 - 21: 'inside'
 - 22: 'inside'
 - 23: 'inside'
 - 24: 'inside'
 - 25: 'inside'
 - 26: 'inside'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
