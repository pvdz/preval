# Preval test case

# var_body.md

> Normalize > While > Var body
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
while ($(true)) var x = $(10);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
while ($(true)) x = $(10);
`````

## Normalized

`````js filename=intro
let x = undefined;
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    x = $(10);
    tmpIfTest = $(true);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(10);
  let tmpClusterSSA_tmpIfTest = $(true);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      $(10);
      tmpClusterSSA_tmpIfTest = $(true);
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
const a = $( true );
if (a) {
  $( 10 );
  let b = $( true );
  while ($LOOP_UNROLL_10) {
    if (b) {
      $( 10 );
      b = $( true );
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
 - 1: true
 - 2: 10
 - 3: true
 - 4: 10
 - 5: true
 - 6: 10
 - 7: true
 - 8: 10
 - 9: true
 - 10: 10
 - 11: true
 - 12: 10
 - 13: true
 - 14: 10
 - 15: true
 - 16: 10
 - 17: true
 - 18: 10
 - 19: true
 - 20: 10
 - 21: true
 - 22: 10
 - 23: true
 - 24: 10
 - 25: true
 - 26: 10
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
