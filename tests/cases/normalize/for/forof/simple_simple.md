# Preval test case

# simple_simple.md

> Normalize > For > Forof > Simple simple
>
> For-in must be normalized

## Input

`````js filename=intro
let a;
let b = {x: 1, y: 2}
for (a of b) $(a);
`````

## Pre Normal


`````js filename=intro
let a;
let b = { x: 1, y: 2 };
{
  let tmpForOfGen = $forOf(b);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      a = tmpForOfNext.value;
      $(a);
    }
  }
}
`````

## Normalized


`````js filename=intro
let a = undefined;
let b = { x: 1, y: 2 };
let tmpForOfGen = $forOf(b);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = tmpForOfNext.value;
    $(a);
  }
}
`````

## Output


`````js filename=intro
const b /*:object*/ = { x: 1, y: 2 };
const tmpForOfGen /*:unknown*/ = $forOf(b);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const tmpClusterSSA_a /*:unknown*/ = tmpForOfNext.value;
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
const b = $forOf( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    const e = c.value;
    $( e );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next