# Preval test case

# eq_number_string.md

> Type tracked > Eqeqeq > Eq number string
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

#TODO

## Input

`````js filename=intro
const x = 1 * $(2); // Must be number
const y = '' + $(2); // Must be string
$(x === y); // Must be false (number !== bool)
`````

## Pre Normal

`````js filename=intro
const x = 1 * $(2);
const y = '' + $(2);
$(x === y);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpBinBothLhs$1 = '';
const tmpBinBothRhs$1 = $(2);
const y = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpCallCallee = $;
const tmpCalleeParam = x === y;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = $(2);
1 * tmpBinBothRhs;
const tmpBinBothRhs$1 = $(2);
'' + tmpBinBothRhs$1;
$(false);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
