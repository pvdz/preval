# Preval test case

# eq_undefined_number_lit.md

> Type tracked > Neqeqeq > Eq undefined number lit
>
> If we know the type of a value without knowing the actual value, we can still resolve `===`

#TODO

## Input

`````js filename=intro
const x = $(1) * $(2); // Must be number
$(undefined !== x); // Must be false
`````

## Pre Normal

`````js filename=intro
const x = $(1) * $(2);
$(undefined !== x);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpCallCallee = $;
const tmpCalleeParam = undefined !== x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
tmpBinBothLhs * 0;
tmpBinBothRhs * 0;
$(true);
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
