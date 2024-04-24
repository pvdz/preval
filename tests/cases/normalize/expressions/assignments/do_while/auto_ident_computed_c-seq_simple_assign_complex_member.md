# Preval test case

# auto_ident_computed_c-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Do while > Auto ident computed c-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (1, 2, $(b))[$("c")] = $(b)[$("d")]));
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
    tmpDoWhileFlag = a = (1, 2, $(b))[$(`c`)] = $(b)[$(`d`)];
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
    const varInitAssignLhsComputedObj = $(b);
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
const b = { c: 10, d: 20 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
let tmpSSA_a = varInitAssignLhsComputedRhs;
let tmpSSA_tmpDoWhileFlag = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  $(100);
  const varInitAssignLhsComputedObj$1 = $(b);
  const varInitAssignLhsComputedProp$1 = $(`c`);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const varInitAssignLhsComputedRhs$1 = tmpCompObj$1[tmpCompProp$1];
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  tmpSSA_a = varInitAssignLhsComputedRhs$1;
  tmpSSA_tmpDoWhileFlag = varInitAssignLhsComputedRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      const varInitAssignLhsComputedObj$2 = $(b);
      const varInitAssignLhsComputedProp$2 = $(`c`);
      const tmpCompObj$2 = $(b);
      const tmpCompProp$2 = $(`d`);
      const varInitAssignLhsComputedRhs$2 = tmpCompObj$2[tmpCompProp$2];
      varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$2;
      tmpSSA_a = varInitAssignLhsComputedRhs$2;
      tmpSSA_tmpDoWhileFlag = varInitAssignLhsComputedRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a, b);
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
const c = $( "c" );
const d = $( a );
const e = $( "d" );
const f = d[ e ];
b[c] = f;
let g = f;
let h = f;
if (f) {
  $( 100 );
  const i = $( a );
  const j = $( "c" );
  const k = $( a );
  const l = $( "d" );
  const m = k[ l ];
  i[j] = m;
  g = m;
  h = m;
  while ($LOOP_UNROLL_9) {
    if (h) {
      $( 100 );
      const n = $( a );
      const o = $( "c" );
      const p = $( a );
      const q = $( "d" );
      const r = p[ q ];
      n[o] = r;
      g = r;
      h = r;
    }
    else {
      break;
    }
  }
}
$( g, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { c: '10', d: '20' }
 - 3: 'c'
 - 4: { c: '10', d: '20' }
 - 5: 'd'
 - 6: 100
 - 7: { c: '20', d: '20' }
 - 8: 'c'
 - 9: { c: '20', d: '20' }
 - 10: 'd'
 - 11: 100
 - 12: { c: '20', d: '20' }
 - 13: 'c'
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 100
 - 17: { c: '20', d: '20' }
 - 18: 'c'
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 100
 - 22: { c: '20', d: '20' }
 - 23: 'c'
 - 24: { c: '20', d: '20' }
 - 25: 'd'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
