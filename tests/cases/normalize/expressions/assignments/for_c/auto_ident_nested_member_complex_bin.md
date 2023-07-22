# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Assignments > For c > Auto ident nested member complex bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)[$("x")] = $(c)[$("y")] = d + e);
$(a, b, c, d, e);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $(b)[$(`x`)] = $(c)[$(`y`)] = d + e;
  }
}
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
    const varInitAssignLhsComputedObj = $(c);
    const varInitAssignLhsComputedProp = $(`y`);
    const varInitAssignLhsComputedRhs = d + e;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $(`x`);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
  a = 7;
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpNestedAssignComMemberObj$1 = $(b);
      const tmpNestedAssignComMemberProp$1 = $(`x`);
      const varInitAssignLhsComputedObj$1 = $(c);
      const varInitAssignLhsComputedProp$1 = $(`y`);
      varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
      tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = 7;
      a = 7;
      tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
$(a, b, c, 3, 4);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
let c = {
a: 999,
b: 1000
;
let d = $( 1 );
let e = true;
if (d) {
  const f = $( a );
  const g = $( "x" );
  const h = $( b );
  const i = $( "y" );
  h[i] = 7;
  f[g] = 7;
  c = 7;
  d = $( 1 );
}
else {
  e = false;
}
if (e) {
  while ($LOOP_UNROLL_10) {
    if (d) {
      const j = $( a );
      const k = $( "x" );
      const l = $( b );
      const m = $( "y" );
      l[m] = 7;
      j[k] = 7;
      c = 7;
      d = $( 1 );
    }
    else {
      break;
    }
  }
}
$( c, a, b, 3, 4 );
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
 - 7: { x: '7' }
 - 8: 'x'
 - 9: { y: '7' }
 - 10: 'y'
 - 11: 1
 - 12: { x: '7' }
 - 13: 'x'
 - 14: { y: '7' }
 - 15: 'y'
 - 16: 1
 - 17: { x: '7' }
 - 18: 'x'
 - 19: { y: '7' }
 - 20: 'y'
 - 21: 1
 - 22: { x: '7' }
 - 23: 'x'
 - 24: { y: '7' }
 - 25: 'y'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
