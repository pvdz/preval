# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Statement > For of left > Auto ident cond c-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (((10, 20, $(30)) ? (40, 50, 60) : $($(100))).x of $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for (((10, 20, $(30)) ? (40, 50, 60) : $($(100))).x of $({ x: 1 }));
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
  let tmpAssignMemLhsObj = undefined;
  const tmpIfTest = $(30);
  if (tmpIfTest) {
    tmpAssignMemLhsObj = 60;
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(100);
    tmpAssignMemLhsObj = tmpCallCallee$1(tmpCalleeParam$1);
  }
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  let tmpAssignMemLhsObj = 60;
  const tmpIfTest = $(30);
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$1 = $(100);
    tmpAssignMemLhsObj = $(tmpCalleeParam$1);
  }
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
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
for (d of c) {
  let e = 60;
  const f = $( 30 );
  if (f) {

  }
  else {
    const g = $( 100 );
    e = $( g );
  }
  e.x = d;
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
