# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > For of left > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for ((--b).x of $({ x: 1 }));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
for ((--b).x of $({ x: 1 }));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  b = b - 1;
  let tmpAssignMemLhsObj = b;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a, b);
`````

## Output


`````js filename=intro
let b = 1;
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  b = b - 1;
  b.x = tmpForOfLhsNode;
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = {
  a: 999,
  b: 1000,
};
const c = { x: 1 };
const d = $( c );
let e = undefined;
for (e of d) {
  a = a - 1;
  a.x = e;
}
$( b, a );
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
