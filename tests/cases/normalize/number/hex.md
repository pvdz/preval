# Preval test case

# hex.md

> Normalize > Number > Hex
>
> Numbers should be printed as decimals. Because. Yes.

## Input

`````js filename=intro
$(0x50012);
$(0X50012);
$(0xfffffffffffffffff);
$(0xffffffffffffffffff);
`````

## Settled


`````js filename=intro
$(327698);
$(327698);
$(295147905179352830000);
$(4.722366482869645e21);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(327698);
$(327698);
$(295147905179352830000);
$(4.722366482869645e21);
`````

## Pre Normal


`````js filename=intro
$(327698);
$(327698);
$(295147905179352830000);
$(4.722366482869645e21);
`````

## Normalized


`````js filename=intro
$(327698);
$(327698);
$(295147905179352830000);
$(4.722366482869645e21);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 327698 );
$( 327698 );
$( 295147905179352830000 );
$( 4.722366482869645e+21 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 327698
 - 2: 327698
 - 3: 295147905179352830000
 - 4: 4.722366482869645e21
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
