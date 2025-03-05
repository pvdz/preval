# Preval test case

# plus.md

> Normalize > Unary > Typeof > Plus
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof +$(100));
`````

## Pre Normal


`````js filename=intro
$(typeof +$(100));
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = $(100);
+tmpUnaryArg;
const tmpCalleeParam = `number`;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
+tmpUnaryArg;
$(`number`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
+a;
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
