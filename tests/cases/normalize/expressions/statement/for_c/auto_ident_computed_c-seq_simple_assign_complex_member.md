# Preval test case

# auto_ident_computed_c-seq_simple_assign_complex_member.md

> Normalize > Expressions > Statement > For c > Auto ident computed c-seq simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; $(1); (1, 2, $(b))[$("c")] = $(b)[$("d")]);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    (1, 2, $(b))[$(`c`)] = $(b)[$(`d`)];
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpAssignComMemLhsObj = $(b);
    const tmpAssignComMemLhsProp = $(`c`);
    const tmpAssignComputedObj = tmpAssignComMemLhsObj;
    const tmpAssignComputedProp = tmpAssignComMemLhsProp;
    const tmpCompObj = $(b);
    const tmpCompProp = $(`d`);
    const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
    tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    tmpIfTest = $(1);
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
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpAssignComMemLhsObj$1 = $(b);
      const tmpAssignComMemLhsProp$1 = $(`c`);
      const tmpCompObj$1 = $(b);
      const tmpCompProp$1 = $(`d`);
      const tmpAssignComputedRhs$1 = tmpCompObj$1[tmpCompProp$1];
      tmpAssignComMemLhsObj$1[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
      tmpClusterSSA_tmpIfTest = $(1);
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
const c = $( 1 );
if (c) {
  const d = $( a );
  const e = $( "c" );
  const f = $( a );
  const g = $( "d" );
  const h = f[ g ];
  d[e] = h;
  let i = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (i) {
      const j = $( a );
      const k = $( "c" );
      const l = $( a );
      const m = $( "d" );
      const n = l[ m ];
      j[k] = n;
      i = $( 1 );
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
 - 1: 1
 - 2: { c: '10', d: '20' }
 - 3: 'c'
 - 4: { c: '10', d: '20' }
 - 5: 'd'
 - 6: 1
 - 7: { c: '20', d: '20' }
 - 8: 'c'
 - 9: { c: '20', d: '20' }
 - 10: 'd'
 - 11: 1
 - 12: { c: '20', d: '20' }
 - 13: 'c'
 - 14: { c: '20', d: '20' }
 - 15: 'd'
 - 16: 1
 - 17: { c: '20', d: '20' }
 - 18: 'c'
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 1
 - 22: { c: '20', d: '20' }
 - 23: 'c'
 - 24: { c: '20', d: '20' }
 - 25: 'd'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
