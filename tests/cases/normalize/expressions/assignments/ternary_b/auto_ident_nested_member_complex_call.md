# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident nested member complex call
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
$($(1) ? (a = $(b)[$("x")] = $(c)[$("y")] = $(d)) : $(200));
$(a, b, c, d);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
$($(1) ? (a = $(b)[$(`x`)] = $(c)[$(`y`)] = $(d)) : $(200));
$(a, b, c, d);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedProp$1 = $(`y`);
  const varInitAssignLhsComputedRhs$1 = $(d);
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, b, c, d);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
if (tmpIfTest) {
  const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
  const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
  const varInitAssignLhsComputedRhs$1 /*:unknown*/ = $(3);
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
  a = varInitAssignLhsComputedRhs$1;
  $(varInitAssignLhsComputedRhs$1);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
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
  const i = $( 3 );
  g[h] = i;
  e[f] = i;
  a = i;
  $( i );
}
else {
  const j = $( 200 );
  $( j );
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
 - 6: 3
 - 7: 3
 - 8: 3, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
