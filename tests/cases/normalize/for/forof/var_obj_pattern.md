# Preval test case

# var_obj_pattern.md

> Normalize > For > Forof > Var obj pattern
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
for (let [x] of {a: 1, b: 2}) $(x);
`````

## Pre Normal

`````js filename=intro
for (let [x] of { a: 1, b: 2 }) $(x);
`````

## Normalized

`````js filename=intro
const tmpForOfPatDeclRhs = { a: 1, b: 2 };
let tmpForOfPatDeclLhs = undefined;
let x = undefined;
for (tmpForOfPatDeclLhs of tmpForOfPatDeclRhs) {
  const arrAssignPatternRhs = tmpForOfPatDeclLhs;
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  $(x);
}
`````

## Output

`````js filename=intro
let tmpForOfPatDeclLhs = undefined;
let x = undefined;
const tmpForOfPatDeclRhs = { a: 1, b: 2 };
for (tmpForOfPatDeclLhs of tmpForOfPatDeclRhs) {
  const arrPatternSplat = [...tmpForOfPatDeclLhs];
  x = arrPatternSplat[0];
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
const c = {
a: 1,
b: 2
;
for (a of c) {
  const d = [ ... a ];
  b = d[ 0 ];
  $( b );
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
