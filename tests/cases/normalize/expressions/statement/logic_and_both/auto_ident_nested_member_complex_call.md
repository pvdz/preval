# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Statement > Logic and both > Auto ident nested member complex call
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
($(b)[$("x")] = $(c)[$("y")] = $(d)) && ($(b)[$("x")] = $(c)[$("y")] = $(d));
$(a, b, c, d);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
($(b)[$(`x`)] = $(c)[$(`y`)] = $(d)) && ($(b)[$(`x`)] = $(c)[$(`y`)] = $(d));
$(a, b, c, d);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
const varInitAssignLhsComputedRhs$1 = $(d);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpIfTest = varInitAssignLhsComputedRhs;
if (tmpIfTest) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const varInitAssignLhsComputedObj$3 = $(c);
  const varInitAssignLhsComputedProp$3 = $(`y`);
  const varInitAssignLhsComputedRhs$3 = $(d);
  varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
  const tmpAssignComputedRhs = varInitAssignLhsComputedRhs$3;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
} else {
}
$(a, b, c, d);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
const varInitAssignLhsComputedRhs$1 = $(3);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
if (varInitAssignLhsComputedRhs$1) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const varInitAssignLhsComputedObj$3 = $(c);
  const varInitAssignLhsComputedProp$3 = $(`y`);
  const varInitAssignLhsComputedRhs$3 = $(3);
  varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = varInitAssignLhsComputedRhs$3;
} else {
}
$(a, b, c, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
const c = {
a: 999,
b: 1000
;
const d = $( a );
const e = $( "x" );
const f = $( b );
const g = $( "y" );
const h = $( 3 );
f[g] = h;
d[e] = h;
if (h) {
  const i = $( a );
  const j = $( "x" );
  const k = $( b );
  const l = $( "y" );
  const m = $( 3 );
  k[l] = m;
  i[j] = m;
}
$( c, a, b, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 3
 - 6: { x: '3' }
 - 7: 'x'
 - 8: { y: '3' }
 - 9: 'y'
 - 10: 3
 - 11: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
