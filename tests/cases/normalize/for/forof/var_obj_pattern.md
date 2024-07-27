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
const tmpCallCallee = $forOf;
const tmpCalleeParam = { a: 1, b: 2 };
let tmpForOfGen = tmpCallCallee(tmpCalleeParam);
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
const tmpCalleeParam = { a: 1, b: 2 };
const tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const bindingPatternArrRoot = tmpForOfNext.value;
    const arrPatternSplat = [...bindingPatternArrRoot];
    const x = arrPatternSplat[0];
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
    const f = [ ... e ];
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
