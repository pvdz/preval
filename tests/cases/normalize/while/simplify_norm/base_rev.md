# Preval test case

# base_rev.md

> Normalize > While > Simplify norm > Base rev
>
> Try to undo some of the damage that was necessary during loop normalizations

#TODO

## Input

`````js filename=intro
while (true) {
  const tmpIfTest = $();
  if (tmpIfTest) {
    break;
  } else {
  }
}
`````

## Pre Normal

`````js filename=intro
while (true) {
  const tmpIfTest = $();
  if (tmpIfTest) {
    break;
  } else {
  }
}
`````

## Normalized

`````js filename=intro
const tmpUnaryArg = $();
let tmpIfTest = !tmpUnaryArg;
while (true) {
  if (tmpIfTest) {
    const tmpUnaryArg$1 = $();
    tmpIfTest = !tmpUnaryArg$1;
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
const tmpUnaryArg = $();
let tmpIfTest = tmpUnaryArg;
let $tmpLoopUnrollCheck = true;
if (tmpUnaryArg) {
  $tmpLoopUnrollCheck = false;
} else {
  const tmpUnaryArg$1 = $();
  tmpIfTest = tmpUnaryArg$1;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      break;
    } else {
      const tmpUnaryArg$2 = $();
      tmpIfTest = tmpUnaryArg$2;
    }
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - 3: 
 - 4: 
 - 5: 
 - 6: 
 - 7: 
 - 8: 
 - 9: 
 - 10: 
 - 11: 
 - 12: 
 - 13: 
 - 14: 
 - 15: 
 - 16: 
 - 17: 
 - 18: 
 - 19: 
 - 20: 
 - 21: 
 - 22: 
 - 23: 
 - 24: 
 - 25: 
 - 26: 
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
