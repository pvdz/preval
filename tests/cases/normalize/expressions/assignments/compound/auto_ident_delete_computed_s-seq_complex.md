# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> normalize > expressions > assignments > compound > auto_ident_delete_computed_s-seq_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$((a *= delete ($(1), $(2), x)[$("y")]));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedCompoundLhs = a;
const tmpBinBothLhs = tmpNestedCompoundLhs;
$(1);
$(2);
const tmpDeleteCompObj = x;
const tmpDeleteCompProp = $('y');
const tmpBinBothRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpNestedComplexRhs = tmpBinBothLhs * tmpBinBothRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedCompoundLhs = a;
const tmpBinBothLhs = tmpNestedCompoundLhs;
$(1);
$(2);
const tmpDeleteCompObj = x;
const tmpDeleteCompProp = $('y');
const tmpBinBothRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpNestedComplexRhs = tmpBinBothLhs * tmpBinBothRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: NaN
 - 5: NaN, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
