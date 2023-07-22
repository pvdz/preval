# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident delete computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = delete $(arg)[$("y")]));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = delete $(arg)[$(`y`)];
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpDeleteCompObj = $(arg);
    const tmpDeleteCompProp = $(`y`);
    const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
$(100);
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpClusterSSA_a = tmpNestedComplexRhs;
let tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
let $tmpLoopUnrollCheck = true;
if (tmpNestedComplexRhs) {
  $(100);
  const tmpDeleteCompObj$1 = $(arg);
  const tmpDeleteCompProp$1 = $(`y`);
  const tmpNestedComplexRhs$1 = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
  tmpClusterSSA_a = tmpNestedComplexRhs$1;
  tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      const tmpDeleteCompObj$2 = $(arg);
      const tmpDeleteCompProp$2 = $(`y`);
      const tmpNestedComplexRhs$2 = delete tmpDeleteCompObj$2[tmpDeleteCompProp$2];
      tmpClusterSSA_a = tmpNestedComplexRhs$2;
      tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = { y: 1 };
const b = $( a );
const c = $( "y" );
const d = deleteb[ c ];
let e = d;
let f = d;
let g = true;
if (d) {
  $( 100 );
  const h = $( a );
  const i = $( "y" );
  const j = deleteh[ i ];
  e = j;
  f = j;
}
else {
  g = false;
}
if (g) {
  while ($LOOP_UNROLL_9) {
    if (f) {
      $( 100 );
      const k = $( a );
      const l = $( "y" );
      const m = deletek[ l ];
      e = m;
      f = m;
    }
    else {
      break;
    }
  }
}
$( e, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { y: '1' }
 - 3: 'y'
 - 4: 100
 - 5: {}
 - 6: 'y'
 - 7: 100
 - 8: {}
 - 9: 'y'
 - 10: 100
 - 11: {}
 - 12: 'y'
 - 13: 100
 - 14: {}
 - 15: 'y'
 - 16: 100
 - 17: {}
 - 18: 'y'
 - 19: 100
 - 20: {}
 - 21: 'y'
 - 22: 100
 - 23: {}
 - 24: 'y'
 - 25: 100
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
