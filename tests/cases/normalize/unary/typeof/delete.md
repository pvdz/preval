# Preval test case

# delete.md

> Normalize > Unary > Typeof > Delete
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof delete $(100).x);
`````

## Pre Normal


`````js filename=intro
$(typeof delete $(100).x);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpDeleteObj = $(100);
delete tmpDeleteObj.x;
const tmpCalleeParam = `boolean`;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpDeleteObj /*:unknown*/ = $(100);
delete tmpDeleteObj.x;
$(`boolean`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
delete a.x;
$( "boolean" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
