# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > For of left > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
for ((a = b?.c(1)).x of $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
for ((a = b?.c(1)).x of $({ x: 1 }));
$(a);
`````

## Normalized


`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
    a = tmpChainElementCall;
  } else {
  }
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Output


`````js filename=intro
const b = { c: $ };
let a = undefined;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpChainElementObject = b.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, b, 1);
  a = tmpChainElementCall;
  tmpChainElementCall.x = tmpForOfLhsNode;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: $ };
let b = undefined;
const c = { x: 1 };
const d = $( c );
let e = undefined;
for (e of d) {
  const f = a.c;
  const g = $dotCall( f, a, 1 );
  b = g;
  g.x = e;
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
