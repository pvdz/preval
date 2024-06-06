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
const tmpCallCallee = [];
$coerce(tmpCallCallee, `string`);
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
