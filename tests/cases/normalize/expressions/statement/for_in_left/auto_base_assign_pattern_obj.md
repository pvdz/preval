# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > statement > for_in_left > auto_base_assign_pattern_obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (({ b } = $({ b: $(2) })).x in $({ x: 1 }));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    let tmpAssignMemLhsObj;
    const tmpCallCallee$1 = $;
    const tmpObjLitVal = $(2);
    const tmpCalleeParam$1 = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
    b = tmpNestedAssignObjPatternRhs.b;
    tmpAssignMemLhsObj = tmpNestedAssignObjPatternRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    const tmpObjLitVal = $(2);
    const tmpCalleeParam$1 = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$1);
    b = tmpNestedAssignObjPatternRhs.b;
    const tmpAssignMemLhsObj = tmpNestedAssignObjPatternRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 2
 - 3: { b: '2' }
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
