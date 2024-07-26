# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > For in left > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for ((a = delete ($(1), $(2), $(arg)).y).x in $({ x: 1 }));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
for ((a = delete ($(1), $(2), $(arg)).y).x in $({ x: 1 }));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
let a = 1;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  a.x = tmpForInLhsNode;
}
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
let b = 1;
const c = { x: 1 };
const d = $( c );
let e = undefined;
for (e in d) {
  $( 1 );
  $( 2 );
  const f = $( a );
  b = delete f.y;
  b.x = e;
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - eval returned: ("<crash[ Cannot create property 'x' on boolean 'true' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
