# Preval test case

# simple.md

> Normalize > Tagged > Simple
>
> A tagged template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$`abc ${ $(1) } def`;
`````

## Pre Normal

`````js filename=intro
$([`abc `, ` def`], $(1));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [`abc `, ` def`];
const tmpCalleeParam$1 = $(1);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam = [`abc `, ` def`];
$(tmpCalleeParam, tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = [ "abc ", " def" ];
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: ['abc ', ' def'], 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
