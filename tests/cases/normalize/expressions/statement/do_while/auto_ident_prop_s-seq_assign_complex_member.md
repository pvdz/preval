# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> Normalize > Expressions > Statement > Do while > Auto ident prop s-seq assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (((1, 2, b).c = $(b)[$("d")]));
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
    tmpDoWhileFlag = (1, 2, b).c = $(b)[$(`d`)];
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
    const tmpNestedAssignObj = b;
    const tmpCompObj = $(b);
    const tmpCompProp = $(`d`);
    const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
    tmpDoWhileFlag = tmpNestedPropAssignRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
$(100);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
b.c = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  $(100);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
  b.c = tmpNestedAssignPropRhs$1;
  let tmpClusterSSA_tmpDoWhileFlag$1 = tmpNestedAssignPropRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag$1) {
      $(100);
      const tmpCompObj$2 = $(b);
      const tmpCompProp$2 = $(`d`);
      const tmpNestedAssignPropRhs$2 = tmpCompObj$2[tmpCompProp$2];
      b.c = tmpNestedAssignPropRhs$2;
      tmpClusterSSA_tmpDoWhileFlag$1 = tmpNestedAssignPropRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
c: 10,
d: 20
;
const b = {
a: 999,
b: 1000
;
$( 100 );
const c = $( a );
const d = $( "d" );
const e = c[ d ];
a.c = e;
if (e) {
  $( 100 );
  const f = $( a );
  const g = $( "d" );
  const h = f[ g ];
  a.c = h;
  let i = h;
  while ($LOOP_UNROLL_9) {
    if (i) {
      $( 100 );
      const j = $( a );
      const k = $( "d" );
      const l = j[ k ];
      a.c = l;
      i = l;
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
