# Preval test case

# complex_simple.md

> Normalize > For > Forin > Complex simple
>
> For-in must be normalized

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a).x in b) $(a.x);
`````

## Pre Normal


`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
{
  let tmpForInGen = $forIn(b);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      $(a).x = tmpForInNext.value;
      $(a.x);
    }
  }
}
`````

## Normalized


`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
let tmpForInGen = $forIn(b);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpAssignMemLhsObj = $(a);
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
    const tmpCalleeParam = a.x;
    $(tmpCalleeParam);
  }
}
`````

## Output


`````js filename=intro
const b /*:object*/ = { x: 1, y: 2 };
const tmpForInGen /*:unknown*/ = $forIn(b);
const a /*:object*/ = {};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpAssignMemLhsObj /*:unknown*/ = $(a);
    const tmpAssignMemRhs /*:unknown*/ = tmpForInNext.value;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    const tmpCalleeParam /*:unknown*/ = a.x;
    $(tmpCalleeParam);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
};
const b = $forIn( a );
const c = {};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = b.next();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = $( c );
    const g = d.value;
    f.x = g;
    const h = c.x;
    $( h );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: 'x'
 - 3: { x: '"x"' }
 - 4: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check
- Calling a static method on an ident that is not global and not recorded: $tmpForInGen_next