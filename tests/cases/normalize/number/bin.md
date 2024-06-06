# Preval test case

# bin.md

> Normalize > Number > Bin
>
> Numbers should be printed as decimals. Because. Yes.

#TODO

## Input

`````js filename=intro
$(0b010111010110);
$(0b010111010110);
$(0b111111111111111111111111111111111111111111111111111111111111111111111);
$(0b1111111111111111111111111111111111111111111111111111111111111111111111);
`````

## Pre Normal


`````js filename=intro
$(1494);
$(1494);
$(590295810358705700000);
$(1.1805916207174113e21);
`````

## Normalized


`````js filename=intro
$(1494);
$(1494);
$(590295810358705700000);
$(1.1805916207174113e21);
`````

## Output


`````js filename=intro
$(1494);
$(1494);
$(590295810358705700000);
$(1.1805916207174113e21);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1494 );
$( 1494 );
$( 590295810358705700000 );
$( 1.1805916207174113e+21 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1494
 - 2: 1494
 - 3: 590295810358705700000
 - 4: 1.1805916207174113e21
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
