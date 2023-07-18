# Preval test case

# oct.md

> Normalize > Number > Oct
>
> Numbers should be printed as decimals. Because. Yes.

#TODO

## Input

`````js filename=intro
$(0o50012);
$(0O50012);
$(0o77777777777777777777777);
$(0o777777777777777777777777);
`````

## Pre Normal

`````js filename=intro
$(20490);
$(20490);
$(590295810358705700000);
$(4.722366482869645e21);
`````

## Normalized

`````js filename=intro
$(20490);
$(20490);
$(590295810358705700000);
$(4.722366482869645e21);
`````

## Output

`````js filename=intro
$(20490);
$(20490);
$(590295810358705700000);
$(4.722366482869645e21);
`````

## PST Output

With rename=true

`````js filename=intro
$( 20490 );
$( 20490 );
$( 590295810358705700000 );
$( 4.722366482869645e+21 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 20490
 - 2: 20490
 - 3: 590295810358705700000
 - 4: 4.722366482869645e21
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
