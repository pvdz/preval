# Preval test case

# number.md

> Normalize > Unary > Typeof > Number
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof 500);
`````

## Pre Normal


`````js filename=intro
$(typeof 500);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `number`;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`number`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "number" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
