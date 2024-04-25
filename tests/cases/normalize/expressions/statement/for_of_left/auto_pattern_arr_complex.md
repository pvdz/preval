# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Statement > For of left > Auto pattern arr complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for ($([1, 2]).x of $({ x: 1 }));
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for ($([1, 2]).x of $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = [1, 2];
  const tmpAssignMemLhsObj = tmpCallCallee$1(tmpCalleeParam$1);
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpCalleeParam$1 = [1, 2];
  const tmpAssignMemLhsObj = $(tmpCalleeParam$1);
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ ... a ];
const c = b[ 0 ];
const d = { x: 1 };
const e = $( d );
let f = undefined;
for (f of e) {
  const g = [ 1, 2 ];
  const h = $( g );
  h.x = f;
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
