# Preval test case

# auto_ident_nested_member_complex_simple.md

> normalize > expressions > assignments > for_of_left > auto_ident_nested_member_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
for ((a = $(b)[$("x")] = $(c)[$("y")] = d).x of $({ x: 1 }));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    let tmpAssignMemLhsObj;
    let tmpNestedComplexRhs;
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $('x');
    let tmpNestedAssignPropRhs;
    const tmpNestedAssignComMemberObj$1 = $(c);
    const tmpNestedAssignComMemberProp$1 = $('y');
    const tmpNestedPropAssignRhs = d;
    tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs;
    tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
    const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
    tmpNestedComplexRhs = tmpNestedPropAssignRhs$1;
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  let tmpAssignMemLhsObj;
  let tmpNestedComplexRhs;
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('x');
  let tmpNestedAssignPropRhs;
  const tmpNestedAssignComMemberObj$1 = $(c);
  const tmpNestedAssignComMemberProp$1 = $('y');
  tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = 3;
  tmpNestedAssignPropRhs = 3;
  const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs$1;
  a = tmpNestedComplexRhs;
  tmpAssignMemLhsObj = tmpNestedComplexRhs;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a, b, c, 3);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
