# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Assignments > For of left > Auto ident upd im complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for ((a = $($(b)).x--).x of $({ x: 1 }));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
for ((a = $($(b)).x--).x of $({ x: 1 }));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(b);
  const tmpPostUpdArgObj = tmpCallCallee$1(tmpCalleeParam$1);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemLhsObj$1 = tmpPostUpdArgObj;
  const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  a = tmpPostUpdArgVal;
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { x: 1 };
let a = 1;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpCalleeParam$1 = $(b);
  const tmpPostUpdArgObj = $(tmpCalleeParam$1);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
  tmpPostUpdArgObj.x = tmpAssignMemRhs;
  a = tmpPostUpdArgVal;
  tmpPostUpdArgVal.x = tmpForOfLhsNode;
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
let b = 1;
const c = { x: 1 };
const d = $( c );
let e = undefined;
for (e of d) {
  const f = $( a );
  const g = $( f );
  const h = g.x;
  const i = h - 1;
  g.x = i;
  b = h;
  h.x = e;
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
