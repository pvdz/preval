# Preval test case

# auto_ident_opt_call_complex_complex.md

> normalize > expressions > statement > for_of_left > auto_ident_opt_call_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($)?.($(1))).x of $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    let tmpAssignMemLhsObj = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall($);
    if (tmpChainElementCall) {
      const tmpCallObj = tmpChainElementCall;
      const tmpCallVal = tmpCallObj.call;
      const tmpCalleeParam$1 = tmpChainRootCall;
      const tmpCalleeParam$2 = $(1);
      const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam$1, tmpCalleeParam$2);
      tmpAssignMemLhsObj = tmpChainElementCall$1;
    }
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
