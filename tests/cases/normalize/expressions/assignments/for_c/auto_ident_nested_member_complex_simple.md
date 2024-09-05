# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Assignments > For c > Auto ident nested member complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)[$("x")] = $(c)[$("y")] = d);
$(a, b, c, d);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $(b)[$(`x`)] = $(c)[$(`y`)] = d;
  }
}
$(a, b, c, d);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
    const varInitAssignLhsComputedObj = $(c);
    const varInitAssignLhsComputedProp = $(`y`);
    const varInitAssignLhsComputedRhs = d;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
  } else {
    break;
  }
}
$(a, b, c, d);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
const b = { x: 1 };
const c = { y: 2 };
if (tmpIfTest) {
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $(`x`);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
  a = 3;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      const tmpNestedAssignComMemberObj$1 = $(b);
      const tmpNestedAssignComMemberProp$1 = $(`x`);
      const varInitAssignLhsComputedObj$1 = $(c);
      const varInitAssignLhsComputedProp$1 = $(`y`);
      varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
      tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = 3;
    } else {
      break;
    }
  }
} else {
}
$(a, b, c, 3);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
const c = { x: 1 };
const d = { y: 2 };
if (b) {
  const e = $( c );
  const f = $( "x" );
  const g = $( d );
  const h = $( "y" );
  g[h] = 3;
  e[f] = 3;
  a = 3;
  while ($LOOP_UNROLL_10) {
    const i = $( 1 );
    if (i) {
      const j = $( c );
      const k = $( "x" );
      const l = $( d );
      const m = $( "y" );
      l[m] = 3;
      j[k] = 3;
    }
    else {
      break;
    }
  }
}
$( a, c, d, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 1
 - 7: { x: '3' }
 - 8: 'x'
 - 9: { y: '3' }
 - 10: 'y'
 - 11: 1
 - 12: { x: '3' }
 - 13: 'x'
 - 14: { y: '3' }
 - 15: 'y'
 - 16: 1
 - 17: { x: '3' }
 - 18: 'x'
 - 19: { y: '3' }
 - 20: 'y'
 - 21: 1
 - 22: { x: '3' }
 - 23: 'x'
 - 24: { y: '3' }
 - 25: 'y'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
