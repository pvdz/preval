# Preval test case

# default_yes_no__empty3.md

> Normalize > Pattern > Binding > Obj > Arr > Default yes no  empty3
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const val = true ? false : undefined
$(val);
`````

## Pre Normal


`````js filename=intro
const val = true ? false : undefined;
$(val);
`````

## Normalized


`````js filename=intro
let val = undefined;
val = false;
$(val);
`````

## Output


`````js filename=intro
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
$( false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
