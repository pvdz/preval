# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Bindings > Export > Auto pattern arr s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let [a] = ($(10), $(20), [1, 2]);
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = ($(10), $(20), [1, 2]);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
$(10);
$(20);
let bindingPatternArrRoot = [1, 2];
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
export { a };
$(a);
`````

## Output


`````js filename=intro
$(10);
$(20);
const a = 1;
export { a };
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
$( 20 );
const a = 1;
export { a as a from "undefined"
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
