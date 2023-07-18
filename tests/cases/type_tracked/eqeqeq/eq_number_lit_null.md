# Preval test case

# eq_number_lit_null.md

> Type tracked > Eqeqeq > Eq number lit null
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

#TODO

## Input

`````js filename=intro
const x = $(1) * $(2); // Must be number
$(x === null); // Must be false
`````

## Pre Normal

`````js filename=intro
const x = $(1) * $(2);
$(x === null);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpCallCallee = $;
const tmpCalleeParam = x === null;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
tmpBinBothLhs ** 0;
tmpBinBothRhs ** 0;
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
a ** 0;
b ** 0;
$( false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
