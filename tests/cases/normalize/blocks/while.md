# Preval test case

# while.md

> Normalize > Blocks > While
>
> Add blocks to sub-statements

#TODO

## Input

`````js filename=intro
while ($(1)) $(2);
`````

## Pre Normal

`````js filename=intro
while ($(1)) $(2);
`````

## Normalized

`````js filename=intro
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    $(2);
    tmpIfTest = $(1);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let tmpIfTest = $(1);
if (tmpIfTest) {
  $(2);
  tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      $(2);
      tmpIfTest = $(1);
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
let a = $( 1 );
if (a) {
  $( 2 );
  a = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (a) {
      $( 2 );
      a = $( 1 );
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
