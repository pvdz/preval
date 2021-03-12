# Preval test case

# sequence_simple_prop_both.md

> Normalize > Expressions > Sequence simple prop both
>
> An assignment with rhs of a property on a sequence that ends with a simple node

Relevant for intermediate artifacts.

#TODO

## Input

`````js filename=intro
let a = 0;
a = 'Identifier'.length === 'woop'.length;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = 0;
a = 'Identifier'.length === 'woop'.length;
$(a);
`````

## Normalized

`````js filename=intro
let a = 0;
const tmpBinBothLhs = 10;
const tmpBinBothRhs = 4;
a = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
$(false);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
