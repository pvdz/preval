# Preval test case

# string_empty.md

> Array > Static context > String empty
>
> Calling String on empty array

#TODO

## Input

`````js filename=intro
String([]);
`````

## Pre Normal

`````js filename=intro
String([]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = String;
const tmpCalleeParam = [];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same