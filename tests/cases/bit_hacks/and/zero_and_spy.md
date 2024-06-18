# Preval test case

# zero_and_spy.md

> Bit hacks > And > Zero and spy
>
> And zero is always zero

## Input

`````js filename=intro
$(0 & $spy(0xffffffffffffffffffffffffffffffff));
`````

## Pre Normal


`````js filename=intro
$(0 & $spy(3.402823669209385e38));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = 0;
const tmpBinBothRhs = $spy(3.402823669209385e38);
const tmpCalleeParam = tmpBinBothLhs & tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinBothRhs = $spy(3.402823669209385e38);
tmpBinBothRhs ** 0;
$(0);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( 3.402823669209385e+38 );
a ** 0;
$( 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [3.402823669209385e38, 3.402823669209385e38]
 - 2: '$spy[1].valueOf()', 3.402823669209385e38
 - 3: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
