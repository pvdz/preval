# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Assignments > For of left > Auto ident opt call complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = $($)?.(1)).x of $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = $($)?.(1)).x of $({ x: 1 }));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
    a = tmpChainElementCall$1;
  } else {
  }
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Output


`````js filename=intro
let a = undefined;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpChainElementCall = $($);
  const tmpIfTest = tmpChainElementCall == null;
  if (tmpIfTest) {
  } else {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, 1);
    a = tmpChainElementCall$1;
  }
  a.x = tmpForOfLhsNode;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
let d = undefined;
for (d of c) {
  const e = $( $ );
  const f = e == null;
  if (f) {

  }
  else {
    const g = $dotCall( e, $, 1 );
    a = g;
  }
  a.x = d;
}
$( a );
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
