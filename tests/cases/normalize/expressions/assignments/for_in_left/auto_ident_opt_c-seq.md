# Preval test case

# auto_ident_opt_c-seq.md

> normalize > expressions > assignments > for_in_left > auto_ident_opt_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for ((a = (1, 2, $(b))?.x).x in $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    let tmpAssignMemLhsObj;
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootProp = $(b);
    if (tmpChainRootProp) {
      const tmpChainElementObject = tmpChainRootProp.x;
      tmpNestedComplexRhs = tmpChainElementObject;
    }
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
