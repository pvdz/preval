# Preval test case

# minus.md

> Normalize > Unary > Typeof > Minus
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof -$(100));
`````

## Pre Normal


`````js filename=intro
$(typeof -$(100));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
-tmpUnaryArg;
const tmpCalleeParam = `number`;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(100);
-tmpUnaryArg;
$(`number`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
-a;
$( "number" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
