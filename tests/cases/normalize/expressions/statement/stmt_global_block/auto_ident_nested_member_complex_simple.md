# Preval test case

# auto_ident_nested_member_complex_simple.md

> normalize > expressions > statement > stmt_global_block > auto_ident_nested_member_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
{
  let b = { x: 1 },
    c = { y: 2 },
    d = 3;

  let a = { a: 999, b: 1000 };
  $(b)[$("x")] = $(c)[$("y")] = d;
  $(a, b, c, d);
}
`````

## Normalized

`````js filename=intro
{
  let b = { x: 1 };
  let c = { y: 2 };
  let d = 3;
  let a = { a: 999, b: 1000 };
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $('x');
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  let tmpAssignComputedRhs;
  const tmpNestedAssignComMemberObj = $(c);
  const tmpNestedAssignComMemberProp = $('y');
  const tmpNestedPropAssignRhs = d;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  tmpAssignComputedRhs = tmpNestedPropAssignRhs;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a, b, c, d);
}
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
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 3;
tmpAssignComputedRhs = 3;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, b, c, 3);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
