# Preval test case

# base_string.md

> Type tracked > Typeof > Base string
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

## Input

`````js filename=intro
const x = '' + $(2);
$(typeof x);
`````

## Pre Normal


`````js filename=intro
const x = `` + $(2);
$(typeof x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs + tmpBinBothRhs;
const tmpCallCallee = $;
const tmpCalleeParam = typeof x;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(2);
$coerce(tmpBinBothRhs, `plustr`);
$(`string`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
$coerce( a, "plustr" );
$( "string" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 'string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
