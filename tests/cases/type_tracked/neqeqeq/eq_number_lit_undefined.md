# Preval test case

# eq_number_lit_undefined.md

> Type tracked > Neqeqeq > Eq number lit undefined
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

#TODO

## Input

`````js filename=intro
const x = 1 * $(2); // Must be number
$(x !== undefined); // Must be false
`````

## Pre Normal

`````js filename=intro
const x = 1 * $(2);
$(x !== undefined);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpCallCallee = $;
const tmpCalleeParam = x !== undefined;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = $(2);
tmpBinBothRhs * 0;
$(true);
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
