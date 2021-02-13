# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> normalize > expressions > statement > for_of_left > auto_ident_computed_simple_complex_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for ((b[$("c")] = $(b)[$("d")]).x of $({ x: 1 }));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    const varInitAssignLhsComputedObj = b;
    const varInitAssignLhsComputedProp = $('c');
    const tmpCompObj = $(b);
    const tmpCompProp = $('d');
    const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpAssignMemLhsObj = varInitAssignLhsComputedRhs;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    const varInitAssignLhsComputedObj = b;
    const varInitAssignLhsComputedProp = $('c');
    const tmpCompObj = $(b);
    const tmpCompProp = $('d');
    const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    varInitAssignLhsComputedRhs.x = tmpForOfLhsNode;
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
