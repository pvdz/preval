# Preval test case

# double.md

> Type tracked > Invert > Double
>
> A double bang should convert to a Boolean call because it's one statement vs two.

## Input

`````js filename=intro
$(!!$(1));
`````

## Pre Normal


`````js filename=intro
$(!!$(1));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg$1 = $(1);
const tmpUnaryArg = !tmpUnaryArg$1;
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpUnaryArg$1 = $(1);
const tmpCalleeParam = Boolean(tmpUnaryArg$1);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = Boolean( a );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
