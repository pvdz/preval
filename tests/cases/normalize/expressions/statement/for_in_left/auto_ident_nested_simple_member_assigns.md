# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > statement > for_in_left > auto_ident_nested_simple_member_assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for ((b.x = b.x = b.x = b.x = b.x = b.x = c).x in $({ x: 1 }));
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
    const varInitAssignLhsComputedRhs$5 = c;
    b.x = varInitAssignLhsComputedRhs$5;
    const varInitAssignLhsComputedRhs$4 = varInitAssignLhsComputedRhs$5;
    b.x = varInitAssignLhsComputedRhs$4;
    const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
    b.x = varInitAssignLhsComputedRhs$3;
    const varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
    b.x = varInitAssignLhsComputedRhs$2;
    const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
    b.x = varInitAssignLhsComputedRhs$1;
    const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    b.x = varInitAssignLhsComputedRhs;
    const tmpAssignMemLhsObj = varInitAssignLhsComputedRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
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
const tmpForInRhs = $(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    const varInitAssignLhsComputedRhs$5 = c;
    b.x = varInitAssignLhsComputedRhs$5;
    b.x = varInitAssignLhsComputedRhs$5;
    b.x = varInitAssignLhsComputedRhs$5;
    b.x = varInitAssignLhsComputedRhs$5;
    b.x = varInitAssignLhsComputedRhs$5;
    b.x = varInitAssignLhsComputedRhs$5;
    varInitAssignLhsComputedRhs$5.x = tmpForInLhsNode;
  }
}
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
