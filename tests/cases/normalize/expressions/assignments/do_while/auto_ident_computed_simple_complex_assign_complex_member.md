# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > Do while > Auto ident computed simple complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b[$("c")] = $(b)[$("d")]));
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
    tmpDoWhileFlag = a = b[$(`c`)] = $(b)[$(`d`)];
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
    const varInitAssignLhsComputedProp = $(`c`);
    const tmpCompObj = $(b);
    const tmpCompProp = $(`d`);
    const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
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
const varInitAssignLhsComputedProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
let tmpClusterSSA_a = varInitAssignLhsComputedRhs;
let tmpClusterSSA_tmpDoWhileFlag = varInitAssignLhsComputedRhs;
let $tmpLoopUnrollCheck = true;
if (varInitAssignLhsComputedRhs) {
  $(100);
  const varInitAssignLhsComputedProp$1 = $(`c`);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const varInitAssignLhsComputedRhs$1 = tmpCompObj$1[tmpCompProp$1];
  b[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  tmpClusterSSA_a = varInitAssignLhsComputedRhs$1;
  tmpClusterSSA_tmpDoWhileFlag = varInitAssignLhsComputedRhs$1;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      const varInitAssignLhsComputedProp$2 = $(`c`);
      const tmpCompObj$2 = $(b);
      const tmpCompProp$2 = $(`d`);
      const varInitAssignLhsComputedRhs$2 = tmpCompObj$2[tmpCompProp$2];
      b[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$2;
      tmpClusterSSA_a = varInitAssignLhsComputedRhs$2;
      tmpClusterSSA_tmpDoWhileFlag = varInitAssignLhsComputedRhs$2;
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
const a = $( "c" );
const b = {
c: 10,
d: 20
;
const c = $( b );
const d = $( "d" );
const e = c[ d ];
b[a] = e;
let f = e;
let g = e;
let h = true;
if (e) {
  $( 100 );
  const i = $( "c" );
  const j = $( b );
  const k = $( "d" );
  const l = j[ k ];
  b[i] = l;
  f = l;
  g = l;
}
else {
  h = false;
}
if (h) {
  while ($LOOP_UNROLL_9) {
    if (g) {
      $( 100 );
      const m = $( "c" );
      const n = $( b );
      const o = $( "d" );
      const p = n[ o ];
      b[m] = p;
      f = p;
      g = p;
    }
    else {
      break;
    }
  }
}
$( f, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 100
 - 6: 'c'
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 100
 - 10: 'c'
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 100
 - 14: 'c'
 - 15: { c: '20', d: '20' }
 - 16: 'd'
 - 17: 100
 - 18: 'c'
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 100
 - 22: 'c'
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 100
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
