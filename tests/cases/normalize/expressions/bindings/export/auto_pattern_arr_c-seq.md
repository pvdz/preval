# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Bindings > Export > Auto pattern arr c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let [a] = ($(10), $(20), $([1, 2]));
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = ($(10), $(20), $([1, 2]));
export { a };
$(a);
`````

## Normalized

`````js filename=intro
$(10);
$(20);
const tmpCallCallee = $;
const tmpCalleeParam = [1, 2];
let bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
export { a };
$(a);
`````

## Output

`````js filename=intro
$(10);
$(20);
const tmpCalleeParam = [1, 2];
const bindingPatternArrRoot = $(tmpCalleeParam);
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
$( 20 );
const a = [ 1, 2 ];
const b = $( a );
const c = [ ... b ];
const d = c[ 0 ];
export { d as a from "undefined"
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
