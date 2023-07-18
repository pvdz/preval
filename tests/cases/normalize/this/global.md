# Preval test case

# global.md

> Normalize > This > Global
>
> A constant set to null should be eliminated

Note: in strict mode this in global is gonna be bad.

#TODO

## Input

`````js filename=intro
const x = this;
$(x);
`````

## Pre Normal

`````js filename=intro
const x = undefined;
$(x);
`````

## Normalized

`````js filename=intro
const x = undefined;
$(x);
`````

## Output

`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
