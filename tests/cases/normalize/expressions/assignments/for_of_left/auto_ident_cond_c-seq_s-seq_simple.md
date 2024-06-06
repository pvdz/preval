# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > For of left > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))).x of $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))).x of $({ x: 1 }));
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
  const tmpIfTest = $(30);
  if (tmpIfTest) {
    a = 60;
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(100);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  }
  let tmpAssignMemLhsObj = a;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Output


`````js filename=intro
let a = 60;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpIfTest = $(30);
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$1 = $(100);
    a = $(tmpCalleeParam$1);
  }
  a.x = tmpForOfLhsNode;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 60;
const b = { x: 1 };
const c = $( b );
let d = undefined;
for (d of c) {
  const e = $( 30 );
  if (e) {

  }
  else {
    const f = $( 100 );
    a = $( f );
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
