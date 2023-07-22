# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> Normalize > Expressions > Assignments > Do while > Auto ident prop s-seq assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (1, 2, b).c = $(b)[$("d")]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = (1, 2, b).c = $(b)[$(`d`)];
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const varInitAssignLhsComputedObj = b;
    const tmpCompObj = $(b);
    const tmpCompProp = $(`d`);
    const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
    varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
    const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
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
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
b.c = varInitAssignLhsComputedRhs;
let tmpClusterSSA_a = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  $(100);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const varInitAssignLhsComputedRhs$1 = tmpCompObj$1[tmpCompProp$1];
  b.c = varInitAssignLhsComputedRhs$1;
  tmpClusterSSA_a = varInitAssignLhsComputedRhs$1;
  let tmpClusterSSA_tmpDoWhileFlag$1 = varInitAssignLhsComputedRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag$1) {
      $(100);
      const tmpCompObj$2 = $(b);
      const tmpCompProp$2 = $(`d`);
      const varInitAssignLhsComputedRhs$2 = tmpCompObj$2[tmpCompProp$2];
      b.c = varInitAssignLhsComputedRhs$2;
      tmpClusterSSA_a = varInitAssignLhsComputedRhs$2;
      tmpClusterSSA_tmpDoWhileFlag$1 = varInitAssignLhsComputedRhs$2;
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
const a = {
c: 10,
d: 20
;
const b = $( a );
const c = $( "d" );
const d = b[ c ];
a.c = d;
let e = d;
if (d) {
  $( 100 );
  const f = $( a );
  const g = $( "d" );
  const h = f[ g ];
  a.c = h;
  e = h;
  let i = h;
  while ($LOOP_UNROLL_9) {
    if (i) {
      $( 100 );
      const j = $( a );
      const k = $( "d" );
      const l = j[ k ];
      a.c = l;
      e = l;
      i = l;
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
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 100
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 100
 - 8: { c: '20', d: '20' }
 - 9: 'd'
 - 10: 100
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 100
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 100
 - 17: { c: '20', d: '20' }
 - 18: 'd'
 - 19: 100
 - 20: { c: '20', d: '20' }
 - 21: 'd'
 - 22: 100
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 100
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
