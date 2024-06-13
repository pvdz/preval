# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> Normalize > Expressions > Statement > For c > Auto ident computed complex simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (; $(1); $(b)["c"] = $(b)[$("d")]);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $(b)[`c`] = $(b)[$(`d`)];
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
    const tmpAssignMemLhsObj = $(b);
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpCompObj = $(b);
    const tmpCompProp = $(`d`);
    const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
    tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
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
  const tmpAssignMemLhsObj = $(b);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpAssignMemLhsObj$1 = $(b);
      const tmpCompObj$1 = $(b);
      const tmpCompProp$1 = $(`d`);
      const tmpAssignMemRhs$1 = tmpCompObj$1[tmpCompProp$1];
      tmpAssignMemLhsObj$1.c = tmpAssignMemRhs$1;
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
  d: 20,
};
const b = {
  a: 999,
  b: 1000,
};
const c = $( 1 );
if (c) {
  const d = $( a );
  const e = $( a );
  const f = $( "d" );
  const g = e[ f ];
  d.c = g;
  let h = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (h) {
      const i = $( a );
      const j = $( a );
      const k = $( "d" );
      const l = j[ k ];
      i.c = l;
      h = $( 1 );
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
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 1
 - 6: { c: '20', d: '20' }
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 1
 - 10: { c: '20', d: '20' }
 - 11: { c: '20', d: '20' }
 - 12: 'd'
 - 13: 1
 - 14: { c: '20', d: '20' }
 - 15: { c: '20', d: '20' }
 - 16: 'd'
 - 17: 1
 - 18: { c: '20', d: '20' }
 - 19: { c: '20', d: '20' }
 - 20: 'd'
 - 21: 1
 - 22: { c: '20', d: '20' }
 - 23: { c: '20', d: '20' }
 - 24: 'd'
 - 25: 1
 - 26: { c: '20', d: '20' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
