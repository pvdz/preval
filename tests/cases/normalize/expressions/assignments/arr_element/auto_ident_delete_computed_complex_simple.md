# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > assignments > arr_element > auto_ident_delete_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete $(x)["y"]) + (a = delete $(x)["y"]));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = 'y';
const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpDeleteCompObj$1 = $(x);
const tmpDeleteCompProp$1 = 'y';
const tmpNestedComplexRhs$1 = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpDeleteCompObj = $(x);
const tmpNestedComplexRhs = delete tmpDeleteCompObj.y;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpDeleteCompObj$1 = $(x);
const tmpNestedComplexRhs$1 = delete tmpDeleteCompObj$1.y;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: {}
 - 3: 2
 - 4: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
