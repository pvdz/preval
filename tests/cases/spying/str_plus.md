# Preval test case

# str_plus.md

> Spying > Str plus
>
> A spy in a plus

## Input

`````js filename=intro
$('' + $spy());
`````

## Pre Normal


`````js filename=intro
$(`` + $spy());
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $spy();
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $spy();
const tmpCalleeParam /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy();
const b = $coerce( a, "plustr" );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: '12345'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
