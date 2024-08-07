# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = ++b) + (a = ++b));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = ++b) + (a = ++b));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpBinBothLhs = a;
const tmpNestedCompoundLhs$1 = b;
const tmpNestedComplexRhs$1 = tmpNestedCompoundLhs$1 + 1;
b = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
$(5);
$(3, 3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 5 );
$( 3, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 3, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
