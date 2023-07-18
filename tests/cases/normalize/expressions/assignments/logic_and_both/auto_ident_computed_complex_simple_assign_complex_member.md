# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident computed complex simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = $(b)["c"] = $(b)[$("d")]) && (a = $(b)["c"] = $(b)[$("d")]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$((a = $(b)[`c`] = $(b)[$(`d`)]) && (a = $(b)[`c`] = $(b)[$(`d`)]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const varInitAssignLhsComputedObj = $(b);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
  varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
tmpNestedAssignObj.c = tmpNestedAssignPropRhs;
let tmpClusterSSA_a = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  const varInitAssignLhsComputedObj = $(b);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
  varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
  tmpClusterSSA_a = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
} else {
  $(tmpNestedAssignPropRhs);
}
$(tmpClusterSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
c: 10,
d: 20
;
const b = $( a );
const c = $( a );
const d = $( "d" );
const e = c[ d ];
b.c = e;
let f = e;
if (e) {
  const g = $( a );
  const h = $( a );
  const i = $( "d" );
  const j = h[ i ];
  g.c = j;
  f = j;
  $( j );
}
else {
  $( e );
}
$( f, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: { c: '20', d: '20' }
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 20
 - 8: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
