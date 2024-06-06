# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Statement > Export default > Auto pattern arr s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
export default ($(10), $(20), [1, 2]);
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
const tmpAnonDefaultExport = ($(10), $(20), [1, 2]);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
$(10);
$(20);
const tmpAnonDefaultExport = [1, 2];
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
$(10);
$(20);
const tmpAnonDefaultExport = [1, 2];
export { tmpAnonDefaultExport as default };
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
$( 10 );
$( 20 );
const d = [ 1, 2 ];
export { d as default from "undefined"
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
