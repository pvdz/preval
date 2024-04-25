# Preval test case

# pattern_pattern.md

> Normalize > Binding > Export-default > Pattern pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
export let [a, b] = [, x, y] = z;
$(a, b, x, y, z);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2,
  z = [10, 20, 30];
let [a, b] = ([, x, y] = z);
export { a, b };
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
let bindingPatternArrRoot = undefined;
const tmpNestedAssignArrPatternRhs = z;
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat$1[1];
y = arrPatternSplat$1[2];
bindingPatternArrRoot = tmpNestedAssignArrPatternRhs;
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let b = arrPatternSplat[1];
export { a, b };
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
const z = [10, 20, 30];
const arrPatternSplat$1 = [...z];
const tmpSSA_x = arrPatternSplat$1[1];
const tmpSSA_y = arrPatternSplat$1[2];
const arrPatternSplat = [...z];
const a = arrPatternSplat[0];
const b = arrPatternSplat[1];
export { a, b };
$(a, b, tmpSSA_x, tmpSSA_y, z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 10, 20, 30 ];
const b = [ ... a ];
const c = b[ 1 ];
const d = b[ 2 ];
const e = [ ... a ];
const f = e[ 0 ];
const g = e[ 1 ];
export { f as a,g as b from "undefined"
$( f, g, c, d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
