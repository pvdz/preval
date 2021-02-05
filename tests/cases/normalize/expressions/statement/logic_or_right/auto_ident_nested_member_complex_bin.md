# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > statement > logic_or_right > auto_ident_nested_member_complex_bin
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
$(100) || ($(b)[$("x")] = $(c)[$("y")] = d + e);
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
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
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
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
}
$(a, b, c, 7, 4);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, { x: '1' }, { y: '2' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 100
 - 2: { a: '999', b: '1000' }, { x: '1' }, { y: '2' }, 7, 4
 - eval returned: undefined
