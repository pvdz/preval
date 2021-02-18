# Preval test case

# sequence_simple_prop.md

> normalize > assignment > sequence_simple_prop
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

## Normalized

`````js filename=intro
let a = 0;
const tmpBinBothLhs = 'Identifier'.length;
const tmpBinBothRhs = 'woop'.length;
a = tmpBinBothLhs === tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = 'Identifier'.length;
const tmpBinBothRhs = 'woop'.length;
const SSA_a = tmpBinBothLhs === tmpBinBothRhs;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
