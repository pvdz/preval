# Preval test case

# base_number.md

> Type tracked > Typeof > Base number
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

## Input

`````js filename=intro
const x = 1 * $(2);
$(typeof x);
`````

## Pre Normal


`````js filename=intro
const x = 1 * $(2);
$(typeof x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpCalleeParam = typeof x;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(2);
tmpBinBothRhs ** 0;
$(`number`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
a ** 0;
$( "number" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
