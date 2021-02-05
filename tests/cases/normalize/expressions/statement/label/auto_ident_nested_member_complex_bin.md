# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > statement > label > auto_ident_nested_member_complex_bin
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
label: $(b)[$("x")] = $(c)[$("y")] = d + e;
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
{
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
}
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let a = { a: 999, b: 1000 };
const tmpAssignComMemLhsObj = $(b);
const tmpAssignComMemLhsProp = $('x');
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
let tmpAssignComputedRhs;
const tmpNestedAssignComMemberObj = $(c);
const tmpNestedAssignComMemberProp = $('y');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
tmpAssignComputedRhs = 7;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, b, c, 7, 4);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: { a: '999', b: '1000' }, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: { a: '999', b: '1000' }, { x: '7' }, { y: '7' }, 7, 4
 - eval returned: undefined
