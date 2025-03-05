# Preval test case

# undefined.md

> Typeof > Undefined
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof undefined);
`````

## Pre Normal


`````js filename=intro
$(typeof undefined);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `undefined`;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`undefined`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "undefined" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
