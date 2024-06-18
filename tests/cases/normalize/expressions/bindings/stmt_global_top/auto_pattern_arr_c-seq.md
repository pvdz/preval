# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Bindings > Stmt global top > Auto pattern arr c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let [a] = ($(10), $(20), $([1, 2]));
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = ($(10), $(20), $([1, 2]));
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
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [1, 2]
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
