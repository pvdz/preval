# Preval test case

# auto_ident_object_empty.md

> normalize > expressions > assignments > for_in_left > auto_ident_object_empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = {}).x in $({ x: 1 }, 'rhs'));
$(a, 'a');
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpCalleeParam$1 = 'rhs';
const tmpForInRhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    let tmpAssignMemLhsObj;
    const tmpNestedComplexRhs = {};
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, 'a');
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpCalleeParam$1 = 'rhs';
const tmpForInRhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    let tmpAssignMemLhsObj;
    const tmpNestedComplexRhs = {};
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, 'a');
`````

## Result

Should call `$` with:
 - 1: { x: '1' }, 'rhs'
 - 2: { x: '"x"' }, 'a'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
