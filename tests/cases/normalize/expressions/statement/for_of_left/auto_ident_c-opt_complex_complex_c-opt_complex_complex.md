# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> normalize > expressions > statement > for_of_left > auto_ident_c-opt_complex_complex_c-opt_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
for (($(b)?.[$("x")]?.[$("y")]).x of $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    let tmpAssignMemLhsObj = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    if (tmpChainElementCall) {
      const tmpChainRootComputed = $('x');
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      if (tmpChainElementObject) {
        const tmpChainRootComputed$1 = $('y');
        const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
        tmpAssignMemLhsObj = tmpChainElementObject$1;
      }
    }
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    let tmpAssignMemLhsObj = undefined;
    const tmpChainElementCall = $(b);
    if (tmpChainElementCall) {
      const tmpChainRootComputed = $('x');
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      if (tmpChainElementObject) {
        const tmpChainRootComputed$1 = $('y');
        const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
        tmpAssignMemLhsObj = tmpChainElementObject$1;
      }
    }
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