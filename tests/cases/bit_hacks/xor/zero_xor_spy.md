# Preval test case

# zero_xor_spy.md

> Bit hacks > Xor > Zero xor spy
>
> Xor zero is always zero

## Input

`````js filename=intro
$(0 ^ $spy(0xffffffffffffffffffffffffffffffff));
`````

## Pre Normal


`````js filename=intro
$(0 ^ $spy(3.402823669209385e38));
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = 0;
const tmpBinBothRhs = $spy(3.402823669209385e38);
const tmpCalleeParam = tmpBinBothLhs ^ tmpBinBothRhs;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $spy(3.402823669209385e38);
const tmpCalleeParam /*:number*/ = 0 ^ tmpBinBothRhs;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( 3.402823669209385e+38 );
const b = 0 ^ a;
$( b );
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
