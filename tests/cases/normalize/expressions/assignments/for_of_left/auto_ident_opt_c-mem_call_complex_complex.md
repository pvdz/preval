# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> normalize > expressions > assignments > for_of_left > auto_ident_opt_c-mem_call_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for ((a = $(b)?.[$("$")]?.($(1))).x of $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    if (tmpChainElementCall) {
      const tmpChainRootComputed = $('$');
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      if (tmpChainElementObject) {
        const tmpCallObj = tmpChainElementObject;
        const tmpCallVal = tmpCallObj.call;
        const tmpCalleeParam$1 = tmpChainElementCall;
        const tmpCalleeParam$2 = $(1);
        const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam$1, tmpCalleeParam$2);
        a = tmpChainElementCall$1;
      }
    }
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    a = undefined;
    const tmpChainElementCall = $(b);
    if (tmpChainElementCall) {
      const tmpChainRootComputed = $('$');
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      if (tmpChainElementObject) {
        const tmpCallVal = tmpChainElementObject.call;
        const tmpCalleeParam$2 = $(1);
        const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$2);
        a = tmpChainElementCall$1;
      }
    }
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
