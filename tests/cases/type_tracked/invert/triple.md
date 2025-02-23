# Preval test case

# triple.md

> Type tracked > Invert > Triple
>
> A double bang should convert to a Boolean call because it's one statement vs two.

## Input

`````js filename=intro
$(!!!$(1));
`````

## Pre Normal


`````js filename=intro
$(!!!$(1));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg$3 = $(1);
const tmpUnaryArg$1 = !tmpUnaryArg$3;
const tmpUnaryArg = !tmpUnaryArg$1;
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpUnaryArg$3 /*:unknown*/ = $(1);
const tmpUnaryArg /*:boolean*/ = Boolean(tmpUnaryArg$3);
const tmpCalleeParam /*:boolean*/ = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = Boolean( a );
const c = !b;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
