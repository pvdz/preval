# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Statement > While > Auto ident delete prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
while (delete $(arg).y) $(100);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (delete $(arg).y) $(100);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpDeleteObj = $(arg);
  const tmpIfTest = delete tmpDeleteObj.y;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
let $tmpLoopUnrollCheck = true;
const tmpDeleteObj = $(arg);
const tmpIfTest = delete tmpDeleteObj.y;
if (tmpIfTest) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpDeleteObj$1 = $(arg);
    const tmpIfTest$1 = delete tmpDeleteObj$1.y;
    if (tmpIfTest$1) {
      $(100);
    } else {
      break;
    }
  }
} else {
}
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {
a: 999,
b: 1000
;
let c = true;
const d = $( a );
const e = deleted.y;
if (e) {
  $( 100 );
}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    const f = $( a );
    const g = deletef.y;
    if (g) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 100
 - 3: {}
 - 4: 100
 - 5: {}
 - 6: 100
 - 7: {}
 - 8: 100
 - 9: {}
 - 10: 100
 - 11: {}
 - 12: 100
 - 13: {}
 - 14: 100
 - 15: {}
 - 16: 100
 - 17: {}
 - 18: 100
 - 19: {}
 - 20: 100
 - 21: {}
 - 22: 100
 - 23: {}
 - 24: 100
 - 25: {}
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
