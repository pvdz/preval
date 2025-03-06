# Preval test case

# var_obj_pattern.md

> Normalize > For > Forof > Var obj pattern
>
> For-in must be normalized

## Input

`````js filename=intro
for (let [x] of {a: 1, b: 2}) $(x);
`````

## Pre Normal


`````js filename=intro
{
  let tmpForOfGen = $forOf({ a: 1, b: 2 });
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      let [x] = tmpForOfNext.value;
      $(x);
    }
  }
}
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = { a: 1, b: 2 };
let tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let bindingPatternArrRoot = tmpForOfNext.value;
    let arrPatternSplat = [...bindingPatternArrRoot];
    let x = arrPatternSplat[0];
    $(x);
  }
}
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const bindingPatternArrRoot /*:unknown*/ = tmpForOfNext.value;
    const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
    const x /*:unknown*/ = arrPatternSplat[0];
    $(x);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
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
    const f = [ ...e ];
    const g = f[ 0 ];
    $( g );
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
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- Calling a static method on an ident that is not global and not recorded: $tmpForOfGen_next