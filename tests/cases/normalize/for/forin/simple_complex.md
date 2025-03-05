# Preval test case

# simple_complex.md

> Normalize > For > Forin > Simple complex
>
> For-in must be normalized

## Input

`````js filename=intro
let a;
for (a in $({x: 1, y: 2})) $(a);
`````

## Pre Normal


`````js filename=intro
let a;
{
  let tmpForInGen = $forIn($({ x: 1, y: 2 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      a = tmpForInNext.value;
      $(a);
    }
  }
}
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpCalleeParam$1 = { x: 1, y: 2 };
const tmpCalleeParam = $(tmpCalleeParam$1);
let tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = tmpForInNext.value;
    $(a);
  }
}
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { x: 1, y: 2 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpClusterSSA_a /*:unknown*/ = tmpForInNext.value;
    $(tmpClusterSSA_a);
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = c.next();
  const e = d.done;
  if (e) {
    break;
  }
  else {
    const f = d.value;
    $( f );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1', y: '2' }
 - 2: 'x'
 - 3: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
