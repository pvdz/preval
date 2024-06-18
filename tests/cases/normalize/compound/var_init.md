# Preval test case

# var_init.md

> Normalize > Compound > Var init
>
> Compound assignments should be decomposed. This means fewer cases to worry about. We can recompose them in the last step.

## Input

`````js filename=intro
let a = $(1);
var x = a += $(2);
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
let a = $(1);
x = a += $(2);
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
let a = $(1);
const tmpNestedCompoundLhs = a;
const tmpBinBothLhs = tmpNestedCompoundLhs;
const tmpBinBothRhs = $(2);
const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
a = tmpNestedComplexRhs;
x = tmpNestedComplexRhs;
$(x);
`````

## Output


`````js filename=intro
const a = $(1);
const tmpBinBothRhs = $(2);
const tmpNestedComplexRhs = a + tmpBinBothRhs;
$(tmpNestedComplexRhs);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
