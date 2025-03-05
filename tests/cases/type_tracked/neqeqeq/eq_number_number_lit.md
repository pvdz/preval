# Preval test case

# eq_number_number_lit.md

> Type tracked > Neqeqeq > Eq number number lit
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

## Input

`````js filename=intro
const x = 1 * $(2); // Must be number
$(2 !== x); // Must be false (number !== bool)
`````

## Pre Normal


`````js filename=intro
const x = 1 * $(2);
$(2 !== x);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpCalleeParam = 2 !== x;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(2);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpCalleeParam /*:boolean*/ = 2 !== x;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = 1 * a;
const c = 2 !== b;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
