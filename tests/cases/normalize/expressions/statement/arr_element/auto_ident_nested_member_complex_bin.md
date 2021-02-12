# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > statement > arr_element > auto_ident_nested_member_complex_bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
($(b)[$("x")] = $(c)[$("y")] = d + e) + ($(b)[$("x")] = $(c)[$("y")] = d + e);
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const tmpAssignComMemLhsObj = $(b);
const tmpAssignComMemLhsProp = $('x');
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
let tmpAssignComputedRhs;
const tmpNestedAssignComMemberObj = $(c);
const tmpNestedAssignComMemberProp = $('y');
let tmpNestedAssignPropRhs = d + e;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpAssignComputedRhs = tmpNestedPropAssignRhs;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
const tmpAssignComMemLhsObj$1 = $(b);
const tmpAssignComMemLhsProp$1 = $('x');
const tmpAssignComputedObj$1 = tmpAssignComMemLhsObj$1;
const tmpAssignComputedProp$1 = tmpAssignComMemLhsProp$1;
let tmpAssignComputedRhs$1;
const tmpNestedAssignComMemberObj$1 = $(c);
const tmpNestedAssignComMemberProp$1 = $('y');
let tmpNestedAssignPropRhs$1 = d + e;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
tmpAssignComputedRhs$1 = tmpNestedPropAssignRhs$1;
tmpAssignComputedObj$1[tmpAssignComputedProp$1] = tmpAssignComputedRhs$1;
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const tmpAssignComMemLhsObj = $(b);
const tmpAssignComMemLhsProp = $('x');
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
let tmpAssignComputedRhs;
const tmpNestedAssignComMemberObj = $(c);
const tmpNestedAssignComMemberProp = $('y');
let tmpNestedAssignPropRhs = d + e;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpAssignComputedRhs = tmpNestedPropAssignRhs;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
const tmpAssignComMemLhsObj$1 = $(b);
const tmpAssignComMemLhsProp$1 = $('x');
const tmpAssignComputedObj$1 = tmpAssignComMemLhsObj$1;
const tmpAssignComputedProp$1 = tmpAssignComMemLhsProp$1;
let tmpAssignComputedRhs$1;
const tmpNestedAssignComMemberObj$1 = $(c);
const tmpNestedAssignComMemberProp$1 = $('y');
let tmpNestedAssignPropRhs$1 = d + e;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
tmpAssignComputedRhs$1 = tmpNestedPropAssignRhs$1;
tmpAssignComputedObj$1[tmpAssignComputedProp$1] = tmpAssignComputedRhs$1;
$(a, b, c, d, e);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: { x: '7' }
 - 6: 'x'
 - 7: { y: '7' }
 - 8: 'y'
 - 9: { a: '999', b: '1000' }, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
