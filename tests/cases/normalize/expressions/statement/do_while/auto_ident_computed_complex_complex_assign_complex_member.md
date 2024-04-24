# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> Normalize > Expressions > Statement > Do while > Auto ident computed complex complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (($(b)[$("c")] = $(b)[$("d")]));
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
    tmpDoWhileFlag = $(b)[$(`c`)] = $(b)[$(`d`)];
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
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`c`);
    const tmpCompObj = $(b);
    const tmpCompProp = $(`d`);
    const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
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
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
let tmpSSA_tmpDoWhileFlag = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  $(100);
  const tmpNestedAssignComMemberObj$1 = $(b);
  const tmpNestedAssignComMemberProp$1 = $(`c`);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
  tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedAssignPropRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedAssignPropRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      const tmpNestedAssignComMemberObj$2 = $(b);
      const tmpNestedAssignComMemberProp$2 = $(`c`);
      const tmpCompObj$2 = $(b);
      const tmpCompProp$2 = $(`d`);
      const tmpNestedAssignPropRhs$2 = tmpCompObj$2[tmpCompProp$2];
      tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = tmpNestedAssignPropRhs$2;
      tmpSSA_tmpDoWhileFlag = tmpNestedAssignPropRhs$2;
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
const d = $( "c" );
const e = $( a );
const f = $( "d" );
const g = e[ f ];
c[d] = g;
let h = g;
if (g) {
  $( 100 );
  const i = $( a );
  const j = $( "c" );
  const k = $( a );
  const l = $( "d" );
  const m = k[ l ];
  i[j] = m;
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
      h = r;
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
