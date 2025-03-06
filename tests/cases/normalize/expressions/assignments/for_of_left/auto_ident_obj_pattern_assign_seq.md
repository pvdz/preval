# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Assignments > For of left > Auto ident obj pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for ((a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) })).x of $({ x: 1 }));
$(a, x, y);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      (a = { x: x, y: y } = ($(x), $(y), { x: $(3), y: $(4) })).x = tmpForOfNext.value;
    }
  }
}
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = $(tmpCalleeParam$1);
let tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    $(x);
    $(y);
    const tmpObjLitVal = $(3);
    const tmpObjLitVal$1 = $(4);
    const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
    x = tmpNestedAssignObjPatternRhs.x;
    y = tmpNestedAssignObjPatternRhs.y;
    a = tmpNestedAssignObjPatternRhs;
    let tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, x, y);
`````

## Output


`````js filename=intro
let x /*:unknown*/ = 1;
let y /*:unknown*/ = 2;
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    $(x);
    $(y);
    const tmpObjLitVal /*:unknown*/ = $(3);
    const tmpObjLitVal$1 /*:unknown*/ = $(4);
    x = tmpObjLitVal;
    y = tmpObjLitVal$1;
    const tmpNestedAssignObjPatternRhs /*:object*/ = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
    a = tmpNestedAssignObjPatternRhs;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpNestedAssignObjPatternRhs.x = tmpAssignMemRhs;
  }
}
$(a, x, y);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = 2;
let c = {
  a: 999,
  b: 1000,
};
const d = { x: 1 };
const e = $( d );
const f = $forOf( e );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = f.next();
  const h = g.done;
  if (h) {
    break;
  }
  else {
    $( a );
    $( b );
    const i = $( 3 );
    const j = $( 4 );
    a = i;
    b = j;
    const k = {
      x: i,
      y: j,
    };
    c = k;
    const l = g.value;
    k.x = l;
  }
}
$( c, a, b );
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

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next