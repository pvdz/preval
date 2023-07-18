# Preval test case

# call_stmt.md

> Normalize > Sequence > Call stmt
>
> Expression statement that is a call with callee that is a sequence

#TODO

## Input

`````js filename=intro
($(), Date)();
`````

## Pre Normal

`````js filename=intro
($(), Date)();
`````

## Normalized

`````js filename=intro
$();
const tmpCallComplexCallee = Date;
tmpCallComplexCallee();
`````

## Output

`````js filename=intro
$();
Date();
`````

## PST Output

With rename=true

`````js filename=intro
$();
Date();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
