# Preval test case

# var_obj_pattern.md

> Normalize > For > Forin > Var obj pattern
>
> For-in must be normalized

## Input

`````js filename=intro
for (let [x] in {a: 1, b: 2}) $(x);
`````

## Pre Normal


`````js filename=intro
{
  let tmpForInGen = $forIn({ a: 1, b: 2 });
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForInNext = tmpForInGen.next();
    if (tmpForInNext.done) {
      break;
    } else {
      let [x] = tmpForInNext.value;
      $(x);
    }
  }
}
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $forIn;
const tmpCalleeParam = { a: 1, b: 2 };
let tmpForInGen = tmpCallCallee(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let bindingPatternArrRoot = tmpForInNext.value;
    let arrPatternSplat = [...bindingPatternArrRoot];
    let x = arrPatternSplat[0];
    $(x);
  }
}
`````

## Output


`````js filename=intro
const tmpCalleeParam = { a: 1, b: 2 };
const tmpForInGen = $forIn(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen.next();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const bindingPatternArrRoot = tmpForInNext.value;
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
const b = $forIn( a );
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
 - 1: 'a'
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
