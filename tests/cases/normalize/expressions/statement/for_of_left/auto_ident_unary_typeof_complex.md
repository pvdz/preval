# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Statement > For of left > Auto ident unary typeof complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for ((typeof $(arg)).x of $({ x: 1 }));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
for ((typeof $(arg)).x of $({ x: 1 }));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpUnaryArg = $(arg);
  const tmpAssignMemLhsObj = typeof tmpUnaryArg;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a, arg);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpUnaryArg = $(1);
  const tmpAssignMemLhsObj = typeof tmpUnaryArg;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = { x: 1 };
const c = $( b );
let d = undefined;
for (d of c) {
  const e = $( 1 );
  const f = typeofe;
  f.x = d;
}
$( a, 1 );
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
