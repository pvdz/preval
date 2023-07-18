# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = ++b));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = ++b;
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    b = b + 1;
    let tmpNestedComplexRhs = b;
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
let b = 12;
let a = 12;
let tmpDoWhileFlag = true;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (tmpDoWhileFlag) {
    $(100);
    b = b + 1;
    const tmpNestedComplexRhs$1 = b;
    a = tmpNestedComplexRhs$1;
    tmpDoWhileFlag = tmpNestedComplexRhs$1;
  } else {
    break;
  }
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
let a = 12;
let b = 12;
let c = true;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (c) {
    $( 100 );
    a = a + 1;
    const d = a;
    b = d;
    c = d;
  }
  else {
    break;
  }
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - 9: 100
 - 10: 100
 - 11: 100
 - 12: 100
 - 13: 100
 - 14: 100
 - 15: 100
 - 16: 100
 - 17: 100
 - 18: 100
 - 19: 100
 - 20: 100
 - 21: 100
 - 22: 100
 - 23: 100
 - 24: 100
 - 25: 100
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
