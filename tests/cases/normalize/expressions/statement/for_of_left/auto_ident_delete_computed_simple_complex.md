# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > statement > for_of_left > auto_ident_delete_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for ((delete x[$("y")]).x of $({ x: 1 }));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    const tmpDeleteCompObj = x;
    const tmpDeleteCompProp = $('y');
    const tmpAssignMemLhsObj = delete tmpDeleteCompObj[tmpDeleteCompProp];
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    const tmpDeleteCompObj = x;
    const tmpDeleteCompProp = $('y');
    const tmpAssignMemLhsObj = delete tmpDeleteCompObj[tmpDeleteCompProp];
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
