# Preval test case

# pattern_sequence_complex.md

> Normalize > Binding > Export-default > Pattern sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, z = [10, 20, 30];
export let [x, y] = ($(a), $(b), $(z));
$(x, y, z);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2,
  z = [10, 20, 30];
let [x, y] = ($(a), $(b), $(z));
export { x, y };
$(x, y, z);
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
let z = [10, 20, 30];
$(a);
$(b);
let bindingPatternArrRoot = $(z);
let arrPatternSplat = [...bindingPatternArrRoot];
let x = arrPatternSplat[0];
let y = arrPatternSplat[1];
export { x, y };
$(x, y, z);
`````

## Output


`````js filename=intro
$(1);
$(2);
const z = [10, 20, 30];
const bindingPatternArrRoot = $(z);
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
const y = arrPatternSplat[1];
export { x, y };
$(x, y, z);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = [ 10, 20, 30 ];
const b = $( a );
const c = [ ... b ];
const d = c[ 0 ];
const e = c[ 1 ];
export { d as x,e as y };
$( d, e, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
