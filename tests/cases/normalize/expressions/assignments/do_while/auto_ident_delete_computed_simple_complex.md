# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = delete arg[$("y")]));
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
    tmpDoWhileFlag = a = delete arg[$(`y`)];
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
    const tmpDeleteCompObj = arg;
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
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
const tmpNestedComplexRhs = delete arg[tmpDeleteCompProp];
let a = tmpNestedComplexRhs;
let tmpDoWhileFlag = tmpNestedComplexRhs;
let $tmpLoopUnrollCheck = true;
if (tmpNestedComplexRhs) {
  $(100);
  const tmpDeleteCompProp$1 = $(`y`);
  const tmpNestedComplexRhs$1 = delete arg[tmpDeleteCompProp$1];
  a = tmpNestedComplexRhs$1;
  tmpDoWhileFlag = tmpNestedComplexRhs$1;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpDeleteCompProp$2 = $(`y`);
      const tmpNestedComplexRhs$2 = delete arg[tmpDeleteCompProp$2];
      a = tmpNestedComplexRhs$2;
      tmpDoWhileFlag = tmpNestedComplexRhs$2;
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
$( 100 );
const a = $( "y" );
const b = { y: 1 };
const c = deleteb[ a ];
let d = c;
let e = c;
let f = true;
if (c) {
  $( 100 );
  const g = $( "y" );
  const h = deleteb[ g ];
  d = h;
  e = h;
}
else {
  f = false;
}
if (f) {
  while ($LOOP_UNROLL_9) {
    if (e) {
      $( 100 );
      const i = $( "y" );
      const j = deleteb[ i ];
      d = j;
      e = j;
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
 - 2: 'y'
 - 3: 100
 - 4: 'y'
 - 5: 100
 - 6: 'y'
 - 7: 100
 - 8: 'y'
 - 9: 100
 - 10: 'y'
 - 11: 100
 - 12: 'y'
 - 13: 100
 - 14: 'y'
 - 15: 100
 - 16: 'y'
 - 17: 100
 - 18: 'y'
 - 19: 100
 - 20: 'y'
 - 21: 100
 - 22: 'y'
 - 23: 100
 - 24: 'y'
 - 25: 100
 - 26: 'y'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
