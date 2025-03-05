# Preval test case

# one.md

> Typeof > One
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof 1);
`````

## Pre Normal


`````js filename=intro
$(typeof 1);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `number`;
$(tmpCalleeParam);
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
