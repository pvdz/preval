# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > assignments > for_in_left > auto_ident_delete_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for ((a = delete $(x)["y"]).x in $({ x: 1 }));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    let tmpAssignMemLhsObj;
    const tmpDeleteCompObj = $(x);
    const tmpDeleteCompProp = 'y';
    const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  let tmpAssignMemLhsObj;
  const tmpDeleteCompObj = $(x);
  const tmpNestedComplexRhs = delete tmpDeleteCompObj.y;
  a = tmpNestedComplexRhs;
  tmpAssignMemLhsObj = tmpNestedComplexRhs;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { y: '1' }
 - 3: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
