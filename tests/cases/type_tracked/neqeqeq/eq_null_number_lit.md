# Preval test case

# eq_null_number_lit.md

> Type tracked > Neqeqeq > Eq null number lit
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

## Input

`````js filename=intro
const x = $(1) * $(2); // Must be number
$(x !== null); // Must be false
`````

## Pre Normal


`````js filename=intro
const x = $(1) * $(2);
$(x !== null);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpCalleeParam = x !== null;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
tmpBinBothLhs ** 0;
tmpBinBothRhs ** 0;
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
a ** 0;
b ** 0;
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
