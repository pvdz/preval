# Preval test case

# auto_ident_upd_pi_simple.md

> normalize > expressions > assignments > arr_element > auto_ident_upd_pi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

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

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 3, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
