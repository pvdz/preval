# Preval test case

# complex_complex.md

> Normalize > For > Forin > Complex complex
>
> For-in must be normalized

## Input

`````js filename=intro
let a = {};
let b = {x: 1, y: 2};
for ($(a).x in $(b)) $(a.x);
`````

## Pre Normal


`````js filename=intro
let a = {};
let b = { x: 1, y: 2 };
{
  let tmpForInGen = $forIn($(b));
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
const tmpCallCallee = $forIn;
const tmpCalleeParam = $(b);
let tmpForInGen = tmpCallCallee(tmpCalleeParam);
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
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = a.x;
    tmpCallCallee$1(tmpCalleeParam$1);
  }
}
`````

## Output


`````js filename=intro
const b = { x: 1, y: 2 };
const tmpCalleeParam = $(b);
const tmpForInGen = $forIn(tmpCalleeParam);
const a = {};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpAssignMemLhsObj = $(a);
    const tmpAssignMemRhs = tmpForInNext.value;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    const tmpCalleeParam$1 = a.x;
    $(tmpCalleeParam$1);
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
const b = $( a );
const c = $forIn( b );
const d = {};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = c.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = $( d );
    const h = e.value;
    g.x = h;
    const i = d.x;
    $( i );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2' }
 - 2: {}
 - 3: 'x'
 - 4: { x: '"x"' }
 - 5: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
