# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b).c));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = $(b).c;
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpCompObj = $(b);
    const tmpNestedComplexRhs = tmpCompObj.c;
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
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpNestedComplexRhs = tmpCompObj.c;
let tmpClusterSSA_a = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  const tmpCompObj$1 = $(b);
  const tmpNestedComplexRhs$1 = tmpCompObj$1.c;
  tmpClusterSSA_a = tmpNestedComplexRhs$1;
  let tmpClusterSSA_tmpDoWhileFlag$1 = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag$1) {
      $(100);
      const tmpCompObj$2 = $(b);
      const tmpNestedComplexRhs$2 = tmpCompObj$2.c;
      tmpClusterSSA_a = tmpNestedComplexRhs$2;
      tmpClusterSSA_tmpDoWhileFlag$1 = tmpNestedComplexRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = { c: 1 };
const b = $( a );
const c = b.c;
let d = c;
if (c) {
  $( 100 );
  const e = $( a );
  const f = e.c;
  d = f;
  let g = f;
  while ($LOOP_UNROLL_9) {
    if (g) {
      $( 100 );
      const h = $( a );
      const i = h.c;
      d = i;
      g = i;
    }
    else {
      break;
    }
  }
}
$( d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { c: '1' }
 - 3: 100
 - 4: { c: '1' }
 - 5: 100
 - 6: { c: '1' }
 - 7: 100
 - 8: { c: '1' }
 - 9: 100
 - 10: { c: '1' }
 - 11: 100
 - 12: { c: '1' }
 - 13: 100
 - 14: { c: '1' }
 - 15: 100
 - 16: { c: '1' }
 - 17: 100
 - 18: { c: '1' }
 - 19: 100
 - 20: { c: '1' }
 - 21: 100
 - 22: { c: '1' }
 - 23: 100
 - 24: { c: '1' }
 - 25: 100
 - 26: { c: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
