# Preval test case

# loop_body_fix.md

> Tofix > Loop body fix

When there is a `x = true; while (true) if (x) { ... x = y; } else { break }` sort of structure then the body of the if-consequent
can be promoted to the parent block because the outer if inside the while is essentially the while test.

In this example the inner call and test update should be in the loop root

let test = 9;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $('inner');
    test = test - 1;
    if (test) {
    } else {
        break;
    }
}

this will allow the code to ssa the test var, for better or worse

## Options

- unroll=30

## Input

`````js filename=intro
let test = 9;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $('inner');
    test = test - 1;
  } else {
    break;
  }
}
`````

## Pre Normal

`````js filename=intro
let test = 9;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $(`inner`);
    test = test - 1;
  } else {
    break;
  }
}
`````

## Normalized

`````js filename=intro
let test = 9;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $(`inner`);
    test = test - 1;
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let test = 9;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $(`inner`);
    test = test - 1;
  } else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'inner'
 - 2: 'inner'
 - 3: 'inner'
 - 4: 'inner'
 - 5: 'inner'
 - 6: 'inner'
 - 7: 'inner'
 - 8: 'inner'
 - 9: 'inner'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
