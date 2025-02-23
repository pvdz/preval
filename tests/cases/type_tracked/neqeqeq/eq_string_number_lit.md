# Preval test case

# eq_string_number_lit.md

> Type tracked > Neqeqeq > Eq string number lit
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

## Input

`````js filename=intro
const x = 1 * $(2); // Must be number
$('' !== x); // Must be false (number !== string)
`````

## Pre Normal


`````js filename=intro
const x = 1 * $(2);
$(`` !== x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpCallCallee = $;
const tmpCalleeParam = `` !== x;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(2);
tmpBinBothRhs ** 0;
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
a ** 0;
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
