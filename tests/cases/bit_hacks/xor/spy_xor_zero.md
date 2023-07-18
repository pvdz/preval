# Preval test case

# spy_xor_zero.md

> Bit hacks > Xor > Spy xor zero
>
> Xor zero is always zero

#TODO

## Input

`````js filename=intro
$($spy(0xffffffffffffffffffffffffffffffff) ^ 0);
`````

## Pre Normal

`````js filename=intro
$($spy(3.402823669209385e38) ^ 0);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinLhs = $spy(3.402823669209385e38);
const tmpCalleeParam = tmpBinLhs ^ 0;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinLhs = $spy(3.402823669209385e38);
const tmpCalleeParam = tmpBinLhs ^ 0;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( 3.402823669209385e+38 );
const b = a ^ 0;
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
