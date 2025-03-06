# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > For of left > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for ((a = { b } = $({ b: $(2) })).x of $({ x: 1 }));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      (a = { b: b } = $({ b: $(2) })).x = tmpForOfNext.value;
    }
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
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
    const tmpObjLitVal = $(2);
    const tmpCalleeParam$3 = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam$3);
    b = tmpNestedAssignObjPatternRhs.b;
    a = tmpNestedAssignObjPatternRhs;
    let tmpAssignMemLhsObj = a;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let b /*:unknown*/ = {};
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
    const tmpObjLitVal /*:unknown*/ = $(2);
    const tmpCalleeParam$3 /*:object*/ = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam$3);
    b = tmpNestedAssignObjPatternRhs.b;
    a = tmpNestedAssignObjPatternRhs;
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpNestedAssignObjPatternRhs.x = tmpAssignMemRhs;
  }
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {};
let b = {
  a: 999,
  b: 1000,
};
const c = { x: 1 };
const d = $( c );
const e = $forOf( d );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const f = e.next();
  const g = f.done;
  if (g) {
    break;
  }
  else {
    const h = $( 2 );
    const i = { b: h };
    const j = $( i );
    a = j.b;
    b = j;
    const k = f.value;
    j.x = k;
  }
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

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next