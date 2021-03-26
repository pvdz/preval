# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > For in left > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($)?.($(1))).x in $({ x: 1 }));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($)?.($(1))).x in $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  let tmpAssignMemLhsObj = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpCallObj = tmpChainElementCall;
    const tmpCallVal = tmpCallObj.call;
    const tmpCalleeParam$1 = tmpChainRootCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam$1, tmpCalleeParam$3);
    tmpAssignMemLhsObj = tmpChainElementCall$1;
  }
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  let tmpAssignMemLhsObj = undefined;
  const tmpChainElementCall = $($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpCallVal = tmpChainElementCall.call;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementCall, $, tmpCalleeParam$3);
    tmpAssignMemLhsObj = tmpChainElementCall$1;
  }
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
