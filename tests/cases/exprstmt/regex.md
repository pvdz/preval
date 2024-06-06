# Preval test case

# regex.md

> Exprstmt > Regex
>
> Regexes as statement can be eliminated

## Input

`````js filename=intro
/foo/g;
`````

## Pre Normal


`````js filename=intro
/foo/g;
`````

## Normalized


`````js filename=intro

`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

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
