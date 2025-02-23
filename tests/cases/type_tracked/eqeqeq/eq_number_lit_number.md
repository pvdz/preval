# Preval test case

# eq_number_lit_number.md

> Type tracked > Eqeqeq > Eq number lit number
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

## Input

`````js filename=intro
const x = 1 * $(2); // Must be number
$(x === 2); // Both are number so we can't predict the outcome
`````

## Pre Normal


`````js filename=intro
const x = 1 * $(2);
$(x === 2);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpCallCallee = $;
const tmpCalleeParam = x === 2;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(2);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpCalleeParam /*:boolean*/ = x === 2;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = 1 * a;
const c = b === 2;
$( c );
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
