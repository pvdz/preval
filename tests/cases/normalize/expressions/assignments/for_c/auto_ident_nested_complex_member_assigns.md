# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Assignments > For c > Auto ident nested complex member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for (
  ;
  $(1);
  a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
    $("x")
  ] = $(b)[$("x")] = c
);
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = c;
  }
}
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $(`x`);
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedProp = $(`x`);
    const varInitAssignLhsComputedObj$1 = $(b);
    const varInitAssignLhsComputedProp$1 = $(`x`);
    const varInitAssignLhsComputedObj$3 = $(b);
    const varInitAssignLhsComputedProp$3 = $(`x`);
    const varInitAssignLhsComputedObj$5 = $(b);
    const varInitAssignLhsComputedProp$5 = $(`x`);
    const varInitAssignLhsComputedObj$7 = $(b);
    const varInitAssignLhsComputedProp$7 = $(`x`);
    const varInitAssignLhsComputedRhs$7 = c;
    varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = varInitAssignLhsComputedRhs$7;
    const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
    varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$5;
    const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
    varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
    const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
  const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
  const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$3 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$3 /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$5 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$5 /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$7 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp$7 /*:unknown*/ = $(`x`);
  varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
  varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
  varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
  a = 3;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpNestedAssignComMemberObj$1 /*:unknown*/ = $(b);
      const tmpNestedAssignComMemberProp$1 /*:unknown*/ = $(`x`);
      const varInitAssignLhsComputedObj$2 /*:unknown*/ = $(b);
      const varInitAssignLhsComputedProp$2 /*:unknown*/ = $(`x`);
      const varInitAssignLhsComputedObj$4 /*:unknown*/ = $(b);
      const varInitAssignLhsComputedProp$4 /*:unknown*/ = $(`x`);
      const varInitAssignLhsComputedObj$6 /*:unknown*/ = $(b);
      const varInitAssignLhsComputedProp$6 /*:unknown*/ = $(`x`);
      const varInitAssignLhsComputedObj$8 /*:unknown*/ = $(b);
      const varInitAssignLhsComputedProp$8 /*:unknown*/ = $(`x`);
      const varInitAssignLhsComputedObj$10 /*:unknown*/ = $(b);
      const varInitAssignLhsComputedProp$10 /*:unknown*/ = $(`x`);
      varInitAssignLhsComputedObj$10[varInitAssignLhsComputedProp$10] = 3;
      varInitAssignLhsComputedObj$8[varInitAssignLhsComputedProp$8] = 3;
      varInitAssignLhsComputedObj$6[varInitAssignLhsComputedProp$6] = 3;
      varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = 3;
      varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = 3;
      tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = 3;
    } else {
      break;
    }
  }
} else {
}
$(a, b, 3);
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
if (b) {
  const d = $( c );
  const e = $( "x" );
  const f = $( c );
  const g = $( "x" );
  const h = $( c );
  const i = $( "x" );
  const j = $( c );
  const k = $( "x" );
  const l = $( c );
  const m = $( "x" );
  const n = $( c );
  const o = $( "x" );
  n[o] = 3;
  l[m] = 3;
  j[k] = 3;
  h[i] = 3;
  f[g] = 3;
  d[e] = 3;
  a = 3;
  while ($LOOP_UNROLL_10) {
    const p = $( 1 );
    if (p) {
      const q = $( c );
      const r = $( "x" );
      const s = $( c );
      const t = $( "x" );
      const u = $( c );
      const v = $( "x" );
      const w = $( c );
      const x = $( "x" );
      const y = $( c );
      const z = $( "x" );
      const ba = $( c );
      const bb = $( "x" );
      ba[bb] = 3;
      y[z] = 3;
      w[x] = 3;
      u[v] = 3;
      s[t] = 3;
      q[r] = 3;
    }
    else {
      break;
    }
  }
}
$( a, c, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { x: '1' }
 - 5: 'x'
 - 6: { x: '1' }
 - 7: 'x'
 - 8: { x: '1' }
 - 9: 'x'
 - 10: { x: '1' }
 - 11: 'x'
 - 12: { x: '1' }
 - 13: 'x'
 - 14: 1
 - 15: { x: '3' }
 - 16: 'x'
 - 17: { x: '3' }
 - 18: 'x'
 - 19: { x: '3' }
 - 20: 'x'
 - 21: { x: '3' }
 - 22: 'x'
 - 23: { x: '3' }
 - 24: 'x'
 - 25: { x: '3' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check