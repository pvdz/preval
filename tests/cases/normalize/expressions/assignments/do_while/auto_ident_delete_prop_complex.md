# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident delete prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = delete $(arg).y));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = delete $(arg).y)) {
  } else {
    break;
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
let tmpSSA_a = delete tmpDeleteObj.y;
if (tmpSSA_a) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpDeleteObj$1 = $(arg);
    tmpSSA_a = delete tmpDeleteObj$1.y;
    if (tmpSSA_a) {
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
$( 100 );
const b = { y: 1 };
const c = $( b );
let d = deletec.y;
if (d) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = $( b );
    d = deletee.y;
    if (d) {

    }
    else {
      break;
    }
  }
}
$( d, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { y: '1' }
 - 3: 100
 - 4: {}
 - 5: 100
 - 6: {}
 - 7: 100
 - 8: {}
 - 9: 100
 - 10: {}
 - 11: 100
 - 12: {}
 - 13: 100
 - 14: {}
 - 15: 100
 - 16: {}
 - 17: 100
 - 18: {}
 - 19: 100
 - 20: {}
 - 21: 100
 - 22: {}
 - 23: 100
 - 24: {}
 - 25: 100
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
