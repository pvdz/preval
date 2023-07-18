# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident delete computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = delete ($(1), $(2), arg)[$("y")]));
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
    tmpDoWhileFlag = a = delete ($(1), $(2), arg)[$(`y`)];
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
    $(1);
    $(2);
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
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
const tmpNestedComplexRhs = delete arg[tmpDeleteCompProp];
let a = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  $(1);
  $(2);
  const tmpDeleteCompProp$1 = $(`y`);
  const tmpNestedComplexRhs$1 = delete arg[tmpDeleteCompProp$1];
  a = tmpNestedComplexRhs$1;
  let tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      $(1);
      $(2);
      const tmpDeleteCompProp$2 = $(`y`);
      const tmpNestedComplexRhs$2 = delete arg[tmpDeleteCompProp$2];
      a = tmpNestedComplexRhs$2;
      tmpClusterSSA_tmpDoWhileFlag = tmpNestedComplexRhs$2;
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
$( 1 );
$( 2 );
const a = $( "y" );
const b = { y: 1 };
const c = deleteb[ a ];
let d = c;
if (c) {
  $( 100 );
  $( 1 );
  $( 2 );
  const e = $( "y" );
  const f = deleteb[ e ];
  d = f;
  let g = f;
  while ($LOOP_UNROLL_9) {
    if (g) {
      $( 100 );
      $( 1 );
      $( 2 );
      const h = $( "y" );
      const i = deleteb[ h ];
      d = i;
      g = i;
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
 - 2: 1
 - 3: 2
 - 4: 'y'
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: 'y'
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 'y'
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 'y'
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: 'y'
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 'y'
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
