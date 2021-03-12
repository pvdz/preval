# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > For in left > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for ((a = $(b)?.x).x in $({ x: 1 }));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
for ((a = $(b)?.x).x in $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainElementCall.x;
    a = tmpChainElementObject;
  }
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  a = undefined;
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainElementCall.x;
    a = tmpChainElementObject;
  }
  const tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
