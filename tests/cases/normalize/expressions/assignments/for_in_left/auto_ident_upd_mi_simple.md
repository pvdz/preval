# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > assignments > for_in_left > auto_ident_upd_mi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for ((a = --b).x in $({ x: 1 }));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    let tmpAssignMemLhsObj;
    let tmpNestedComplexRhs;
    const tmpNestedCompoundLhs = b;
    const tmpNestedComplexRhs$1 = tmpNestedCompoundLhs - 1;
    b = tmpNestedComplexRhs$1;
    tmpNestedComplexRhs = tmpNestedComplexRhs$1;
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 0, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
