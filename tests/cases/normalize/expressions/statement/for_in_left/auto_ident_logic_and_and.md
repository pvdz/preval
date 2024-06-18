# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > For in left > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($(1)) && $($(1)) && $($(2))).x in $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($(1)) && $($(1)) && $($(2))).x in $({ x: 1 }));
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
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  let tmpAssignMemLhsObj = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpAssignMemLhsObj) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    tmpAssignMemLhsObj = tmpCallCallee$3(tmpCalleeParam$3);
    if (tmpAssignMemLhsObj) {
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = $(2);
      tmpAssignMemLhsObj = tmpCallCallee$5(tmpCalleeParam$5);
    } else {
    }
  } else {
  }
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCalleeParam$1 = $(1);
  let tmpAssignMemLhsObj = $(tmpCalleeParam$1);
  if (tmpAssignMemLhsObj) {
    const tmpCalleeParam$3 = $(1);
    tmpAssignMemLhsObj = $(tmpCalleeParam$3);
    if (tmpAssignMemLhsObj) {
      const tmpCalleeParam$5 = $(2);
      tmpAssignMemLhsObj = $(tmpCalleeParam$5);
    } else {
    }
  } else {
  }
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = { x: 1 };
const c = $( b );
let d = undefined;
for (d in c) {
  const e = $( 1 );
  let f = $( e );
  if (f) {
    const g = $( 1 );
    f = $( g );
    if (f) {
      const h = $( 2 );
      f = $( h );
    }
  }
  f.x = d;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 2
 - eval returned: ("<crash[ Cannot create property 'x' on number '2' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
