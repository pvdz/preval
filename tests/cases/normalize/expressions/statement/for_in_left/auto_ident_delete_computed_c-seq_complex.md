# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> normalize > expressions > statement > for_in_left > auto_ident_delete_computed_c-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for ((delete ($(1), $(2), $(x))[$("y")]).x in $({ x: 1 }));
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
    $(1);
    $(2);
    const tmpDeleteCompObj = $(x);
    const tmpDeleteCompProp = $('y');
    const tmpAssignMemLhsObj = delete tmpDeleteCompObj[tmpDeleteCompProp];
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
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    $(1);
    $(2);
    const tmpDeleteCompObj = $(x);
    const tmpDeleteCompProp = $('y');
    const tmpAssignMemLhsObj = delete tmpDeleteCompObj[tmpDeleteCompProp];
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 'y'
 - 6: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
