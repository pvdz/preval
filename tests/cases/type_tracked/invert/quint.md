# Preval test case

# quint.md

> Type tracked > Invert > Quint
>
> A double bang should convert to a Boolean call because it's one statement vs two.

#TODO

## Input

`````js filename=intro
$(!!!!!$(1));
`````

## Pre Normal


`````js filename=intro
$(!!!!!$(1));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg$7 = $(1);
const tmpUnaryArg$5 = !tmpUnaryArg$7;
const tmpUnaryArg$3 = !tmpUnaryArg$5;
const tmpUnaryArg$1 = !tmpUnaryArg$3;
const tmpUnaryArg = !tmpUnaryArg$1;
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpUnaryArg$7 = $(1);
const tmpUnaryArg$3 = Boolean(tmpUnaryArg$7);
const tmpCalleeParam = !tmpUnaryArg$3;
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
