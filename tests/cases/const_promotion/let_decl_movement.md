# Preval test case

# let_decl_movement.md

> Const promotion > Let decl movement
>
> This was a regression. It would throw in a let decl promotion step due to spread.

#TODO

## Input

`````js filename=intro
let tmpCalleeParam$1 = undefined;
const tmpCalleeParam$3 = [ , , , 1, 20, 30 ];
const arrPatternSplat = [ ...tmpCalleeParam$3 ];
$(tmpCalleeParam$1, arrPatternSplat);
`````

## Pre Normal


`````js filename=intro
let tmpCalleeParam$1 = undefined;
const tmpCalleeParam$3 = [, , , 1, 20, 30];
const arrPatternSplat = [...tmpCalleeParam$3];
$(tmpCalleeParam$1, arrPatternSplat);
`````

## Normalized


`````js filename=intro
let tmpCalleeParam$1 = undefined;
const tmpCalleeParam$3 = [, , , 1, 20, 30];
const arrPatternSplat = [...tmpCalleeParam$3];
$(tmpCalleeParam$1, arrPatternSplat);
`````

## Output


`````js filename=intro
const arrPatternSplat = [undefined, undefined, undefined, 1, 20, 30];
$(undefined, arrPatternSplat);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ undefined, undefined, undefined, 1, 20, 30 ];
$( undefined, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined, [undefined, undefined, undefined, 1, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
