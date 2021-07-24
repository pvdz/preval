# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > For in left > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
for ((b?.c(1)).x in $({ x: 1 }));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
for ((b?.c(1)).x in $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  let tmpAssignMemLhsObj = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
    tmpAssignMemLhsObj = tmpChainElementCall;
  } else {
  }
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Output

`````js filename=intro
const b = { c: $ };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpChainElementObject = b.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, b, 1);
  tmpChainElementCall.x = tmpForInLhsNode;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
