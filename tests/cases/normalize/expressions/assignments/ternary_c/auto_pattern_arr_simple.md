# Preval test case

# auto_pattern_arr_simple.md

> Normalize > Expressions > Assignments > Ternary c > Auto pattern arr simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a, b] = [1, 2];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let [a, b] = [1, 2];
$(a, b);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = [1, 2];
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let b = arrPatternSplat[1];
$(a, b);
`````

## Output


`````js filename=intro
$(1, 2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
