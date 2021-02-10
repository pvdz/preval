# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > assignments > for_in_left > auto_ident_nested_simple_member_assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for ((a = b.x = b.x = b.x = b.x = b.x = b.x = c).x in $({ x: 1 }));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    let tmpAssignMemLhsObj;
    let tmpNestedComplexRhs;
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
    tmpNestedComplexRhs = tmpNestedPropAssignRhs$5;
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
