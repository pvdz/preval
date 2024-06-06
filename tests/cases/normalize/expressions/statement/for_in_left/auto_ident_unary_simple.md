# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Statement > For in left > Auto ident unary simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for ((typeof x).x in $({ x: 1 }));
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
for ((typeof x).x in $({ x: 1 }));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpAssignMemLhsObj = typeof x;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, x);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  `number`.x = tmpForInLhsNode;
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
for (d in c) {
  "number".x = d;
}
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ("<crash[ Cannot create property 'x' on string 'number' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
