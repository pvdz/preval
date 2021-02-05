# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > assignments > binary_both > auto_base_assign_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b = $(2)) + (a = b = $(2)));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs;
const tmpNestedComplexRhs$1 = $(2);
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$2;
const tmpNestedComplexRhs$3 = $(2);
b = tmpNestedComplexRhs$3;
tmpNestedComplexRhs$2 = tmpNestedComplexRhs$3;
a = tmpNestedComplexRhs$2;
tmpBinBothRhs = tmpNestedComplexRhs$2;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs;
const tmpNestedComplexRhs$1 = $(2);
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$2;
const tmpNestedComplexRhs$3 = $(2);
b = tmpNestedComplexRhs$3;
tmpNestedComplexRhs$2 = tmpNestedComplexRhs$3;
a = tmpNestedComplexRhs$2;
tmpBinBothRhs = tmpNestedComplexRhs$2;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 4
 - 4: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
