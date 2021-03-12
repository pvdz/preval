# Preval test case

# star_eq.md

> Normalize > Compound > Star eq
>
> Compound assignments should be decomposed. This means fewer cases to worry about. We can recompose them in the last step.

#TODO

## Input

`````js filename=intro
let a = $(1);
a *= $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = $(1);
a *= $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = $(1);
const tmpBinBothLhs = a;
const tmpBinBothRhs = $(2);
a = tmpBinBothLhs * tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = $(1);
const tmpBinBothRhs = $(2);
const SSA_a = a * tmpBinBothRhs;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
