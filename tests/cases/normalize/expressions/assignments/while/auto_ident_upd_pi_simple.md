# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > While > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
while ((a = ++b)) $(100);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while ((a = ++b)) $(100);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNestedCompoundLhs = b;
  const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let a = 1;
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
let tmpClusterSSA_b$2 = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpNestedComplexRhs$1 = tmpClusterSSA_b$2 + 1;
  tmpClusterSSA_b$2 = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs$1;
  if (tmpNestedComplexRhs$1) {
  } else {
    break;
  }
}
$(a, tmpClusterSSA_b$2);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
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
let b = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const c = b + 1;
  b = c;
  a = c;
  if (c) {

  }
  else {
    break;
  }
}
$( a, b );
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
