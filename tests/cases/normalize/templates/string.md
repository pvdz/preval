# Preval test case

# string.md

> Normalize > Templates > String
>
> A template that is just a string

## Input

`````js filename=intro
$(`foo`);
`````

## Pre Normal


`````js filename=intro
$(`foo`);
`````

## Normalized


`````js filename=intro
$(`foo`);
`````

## Output


`````js filename=intro
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
