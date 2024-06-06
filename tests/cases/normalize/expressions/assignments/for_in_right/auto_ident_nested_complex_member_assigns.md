# Preval test case

# auto_ident_nested_complex_member_assigns.md

> Normalize > Expressions > Assignments > For in right > Auto ident nested complex member assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for (let x in (a = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
  $("x")
] = $(b)[$("x")] = $(b)[$("x")] = c));
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
for (let x in (a = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = $(b)[$(`x`)] = c));
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
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
let tmpForInDeclRhs = a;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a, b, c);
`````

## Output


`````js filename=intro
const b = { x: 1 };
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
varInitAssignLhsComputedObj$7[varInitAssignLhsComputedProp$7] = 3;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = 3;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = 3;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
let x = undefined;
for (x in 3) {
}
$(3, b, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( "x" );
const d = $( a );
const e = $( "x" );
const f = $( a );
const g = $( "x" );
const h = $( a );
const i = $( "x" );
const j = $( a );
const k = $( "x" );
const l = $( a );
const m = $( "x" );
l[m] = 3;
j[k] = 3;
h[i] = 3;
f[g] = 3;
d[e] = 3;
b[c] = 3;
let n = undefined;
for (n in 3) {

}
$( 3, a, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { x: '1' }
 - 6: 'x'
 - 7: { x: '1' }
 - 8: 'x'
 - 9: { x: '1' }
 - 10: 'x'
 - 11: { x: '1' }
 - 12: 'x'
 - 13: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
