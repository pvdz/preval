# Preval test case

# complex_complex.md

> Normalize > Tagged > Complex complex
>
> A tagged template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$`abc ${ $(10) } ${ $(20) } def`;
`````

## Pre Normal


`````js filename=intro
$([`abc `, ` `, ` def`], $(10), $(20));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [`abc `, ` `, ` def`];
const tmpCalleeParam$1 = $(10);
const tmpCalleeParam$3 = $(20);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = $(10);
const tmpCalleeParam$3 = $(20);
const tmpCalleeParam = [`abc `, ` `, ` def`];
$(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( 20 );
const c = [ "abc ", " ", " def" ];
$( c, a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: ['abc ', ' ', ' def'], 10, 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
