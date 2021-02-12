# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > assignments > for_of_left > auto_ident_nested_simple_member_assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for ((a = b.x = b.x = b.x = b.x = b.x = b.x = c).x of $({ x: 1 }));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    let tmpNestedAssignPropRhs;
    let tmpNestedAssignPropRhs$1;
    let tmpNestedAssignPropRhs$2;
    let tmpNestedAssignPropRhs$3;
    let tmpNestedAssignPropRhs$4;
    const tmpNestedPropAssignRhs = c;
    b.x = tmpNestedPropAssignRhs;
    tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs;
    const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
    b.x = tmpNestedPropAssignRhs$1;
    tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
    const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
    b.x = tmpNestedPropAssignRhs$2;
    tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
    const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
    b.x = tmpNestedPropAssignRhs$3;
    tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
    const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
    b.x = tmpNestedPropAssignRhs$4;
    tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
    const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
    b.x = tmpNestedPropAssignRhs$5;
    a = tmpNestedPropAssignRhs$5;
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    let tmpNestedAssignPropRhs;
    let tmpNestedAssignPropRhs$1;
    let tmpNestedAssignPropRhs$2;
    let tmpNestedAssignPropRhs$3;
    let tmpNestedAssignPropRhs$4;
    const tmpNestedPropAssignRhs = c;
    b.x = tmpNestedPropAssignRhs;
    tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs;
    const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
    b.x = tmpNestedPropAssignRhs$1;
    tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
    const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
    b.x = tmpNestedPropAssignRhs$2;
    tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
    const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
    b.x = tmpNestedPropAssignRhs$3;
    tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
    const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
    b.x = tmpNestedPropAssignRhs$4;
    tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
    const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
    b.x = tmpNestedPropAssignRhs$5;
    a = tmpNestedPropAssignRhs$5;
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
