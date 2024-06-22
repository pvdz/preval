# Preval test case

# base.md

> Console > Base
>
>

## Input

`````js filename=intro
console.log('console test case');
`````

## Pre Normal


`````js filename=intro
console.log(`console test case`);
`````

## Normalized


`````js filename=intro
console.log(`console test case`);
`````

## Output


`````js filename=intro
console.log(`console test case`);
`````

## PST Output

With rename=true

`````js filename=intro
console.log( "console test case" );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
