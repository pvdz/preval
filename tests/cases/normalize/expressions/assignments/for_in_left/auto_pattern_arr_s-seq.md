# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > For in left > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (([a] = ($(10), $(20), [1, 2])).x in $({ x: 1 }));
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (([a] = ($(10), $(20), [1, 2])).x in $({ x: 1 }));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  let tmpAssignMemLhsObj = undefined;
  $(10);
  $(20);
  const tmpNestedAssignArrPatternRhs = [1, 2];
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  tmpAssignMemLhsObj = tmpNestedAssignArrPatternRhs;
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
arrPatternSplat[0];
let a = 1;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode = undefined;
for (tmpForInLhsNode in tmpForInRhs) {
  $(10);
  $(20);
  const tmpNestedAssignArrPatternRhs = [1, 2];
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  tmpNestedAssignArrPatternRhs.x = tmpForInLhsNode;
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
const b = [ ... a ];
b[ 0 ];
let c = 1;
const d = { x: 1 };
const e = $( d );
let f = undefined;
for (f in e) {
  $( 10 );
  $( 20 );
  const g = [ 1, 2 ];
  const h = [ ... g ];
  c = h[ 0 ];
  g.x = f;
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
