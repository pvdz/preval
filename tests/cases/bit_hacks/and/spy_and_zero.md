# Preval test case

# spy_and_zero.md

> Bit hacks > And > Spy and zero
>
> And zero is always zero

#TODO

## Input

`````js filename=intro
$($spy(0xffffffffffffffffffffffffffffffff) & 0);
`````

## Pre Normal


`````js filename=intro
$($spy(3.402823669209385e38) & 0);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinLhs = $spy(3.402823669209385e38);
tmpBinLhs & 0;
const tmpCalleeParam = 0;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinLhs = $spy(3.402823669209385e38);
tmpBinLhs ** 0;
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
