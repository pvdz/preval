# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > assignments > arr_element > auto_ident_upd_mi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = --b) + (a = --b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs$1 = tmpNestedCompoundLhs - 1;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$2;
const tmpNestedCompoundLhs$1 = b;
const tmpNestedComplexRhs$3 = tmpNestedCompoundLhs$1 - 1;
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
let tmpBinBothLhs;
let tmpNestedComplexRhs;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs$1 = tmpNestedCompoundLhs - 1;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$2;
const tmpNestedCompoundLhs$1 = b;
const tmpNestedComplexRhs$3 = tmpNestedCompoundLhs$1 - 1;
b = tmpNestedComplexRhs$3;
tmpNestedComplexRhs$2 = tmpNestedComplexRhs$3;
a = tmpNestedComplexRhs$2;
tmpBinBothRhs = tmpNestedComplexRhs$2;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: -1
 - 2: -1, -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
