# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > statement > for_of_left > auto_base_assign_pattern_obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (({ b } = $({ b: $(2) })).x of $({ x: 1 }));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    let tmpAssignMemLhsObj;
    const tmpCallCallee$1 = $;
    const tmpObjLitVal = $(2);
    const tmpCalleeParam$1 = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
    b = tmpNestedAssignObjPatternRhs.b;
    tmpAssignMemLhsObj = tmpNestedAssignObjPatternRhs;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    let tmpAssignMemLhsObj;
    const tmpObjLitVal = $(2);
    const tmpCalleeParam$1 = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
    b = tmpNestedAssignObjPatternRhs.b;
    tmpAssignMemLhsObj = tmpNestedAssignObjPatternRhs;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same