# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > For in left > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = void $(100)).x in $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = void $(100)).x in $({ x: 1 }));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  $(100);
  a = undefined;
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  $(100);
  undefined.x = tmpForInLhsNode;
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
let c = undefined;
for (c in b) {
  $( 100 );
  undefined.x = c;
}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 100
 - eval returned: ("<crash[ Cannot set property 'x' of undefined ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
