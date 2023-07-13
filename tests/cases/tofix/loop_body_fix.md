# Preval test case

# unroll_option_enough.md

> Unwind loops > Counter test > Unroll option enough

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
let counter = 20;
while (counter) {
  $(`test ` + counter);
  counter = counter - 1;
}
`````

## Normalized

`````js filename=intro
let counter = 20;
while (true) {
  if (counter) {
    const tmpCallCallee = $;
    const tmpStringConcatL = $coerce(counter, `plustr`);
    const tmpCalleeParam = `test ${tmpStringConcatL}`;
    tmpCallCallee(tmpCalleeParam);
    counter = counter - 1;
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
$(`test 20`);
$(`test 19`);
$(`test 18`);
$(`test 17`);
$(`test 16`);
$(`test 15`);
$(`test 14`);
$(`test 13`);
$(`test 12`);
$(`test 11`);
$(`test 10`);
let tmpClusterSSA_counter$2 = 9;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (tmpClusterSSA_counter$2) {
    const tmpStringConcatL$1 = $coerce(tmpClusterSSA_counter$2, `string`);
    const tmpCalleeParam$1 = `test ${tmpStringConcatL$1}`;
    $(tmpCalleeParam$1);
    tmpClusterSSA_counter$2 = tmpClusterSSA_counter$2 - 1;
  } else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'test 20'
 - 2: 'test 19'
 - 3: 'test 18'
 - 4: 'test 17'
 - 5: 'test 16'
 - 6: 'test 15'
 - 7: 'test 14'
 - 8: 'test 13'
 - 9: 'test 12'
 - 10: 'test 11'
 - 11: 'test 10'
 - 12: 'test 9'
 - 13: 'test 8'
 - 14: 'test 7'
 - 15: 'test 6'
 - 16: 'test 5'
 - 17: 'test 4'
 - 18: 'test 3'
 - 19: 'test 2'
 - 20: 'test 1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
