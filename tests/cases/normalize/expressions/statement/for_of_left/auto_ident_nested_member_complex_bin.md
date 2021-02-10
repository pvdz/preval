# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > statement > for_of_left > auto_ident_nested_member_complex_bin
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
for (($(b)[$("x")] = $(c)[$("y")] = d + e).x of $({ x: 1 }));
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    let tmpAssignMemLhsObj;
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $('x');
    let tmpNestedAssignPropRhs;
    const tmpNestedAssignComMemberObj$1 = $(c);
    const tmpNestedAssignComMemberProp$1 = $('y');
    let tmpNestedAssignPropRhs$1 = d + e;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
    tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs;
    tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
    const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
    tmpAssignMemLhsObj = tmpNestedPropAssignRhs$1;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
