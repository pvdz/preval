# Preval test case

# auto_ident_opt_call_complex_simple.md

> normalize > expressions > assignments > for_in_left > auto_ident_opt_call_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = $($)?.(1)).x in $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall($);
    if (tmpChainElementCall) {
      const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
      a = tmpChainElementCall$1;
    }
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    a = undefined;
    const tmpChainElementCall = $($);
    if (tmpChainElementCall) {
      const tmpChainElementCall$1 = tmpChainElementCall.call($, 1);
      a = tmpChainElementCall$1;
    }
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same