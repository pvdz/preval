# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > For of left > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (([a] = ($(10), $(20), [1, 2])).x of $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
{
  let tmpForOfGen = $forOf($({ x: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      ([a] = ($(10), $(20), [1, 2])).x = tmpForOfNext.value;
    }
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $forOf;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = { x: 1 };
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
let tmpForOfGen = tmpCallCallee(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    let tmpAssignMemLhsObj = undefined;
    $(10);
    $(20);
    const tmpNestedAssignArrPatternRhs = [1, 2];
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat$1[0];
    tmpAssignMemLhsObj = tmpNestedAssignArrPatternRhs;
    const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
    const tmpAssignMemRhs = tmpForOfNext.value;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
  }
}
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
let a /*:unknown*/ = arrPatternSplat[0];
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    $(10);
    $(20);
    const tmpNestedAssignArrPatternRhs /*:array*/ = [1, 2];
    const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat$1[0];
    const tmpAssignMemRhs /*:unknown*/ = tmpForOfNext.value;
    tmpNestedAssignArrPatternRhs.x = tmpAssignMemRhs;
  }
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ...a ];
let c = b[ 0 ];
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
    $( 10 );
    $( 20 );
    const i = [ 1, 2 ];
    const j = [ ...i ];
    c = j[ 0 ];
    const k = g.value;
    i.x = k;
  }
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
