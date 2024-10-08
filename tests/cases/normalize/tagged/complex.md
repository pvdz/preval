# Preval test case

# complex.md

> Normalize > Tagged > Complex
>
> A tagged template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$`abc ${ 10 } def`;
`````

## Pre Normal


`````js filename=intro
$([`abc `, ` def`], 10);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [`abc `, ` def`];
const tmpCalleeParam$1 = 10;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`abc `, ` def`];
$(tmpCalleeParam, 10);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "abc ", " def" ];
$( a, 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['abc ', ' def'], 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
