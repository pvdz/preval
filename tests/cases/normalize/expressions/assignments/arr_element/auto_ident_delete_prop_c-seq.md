# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > assignments > arr_element > auto_ident_delete_prop_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete ($(1), $(2), $(x)).y) + (a = delete ($(1), $(2), $(x)).y));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
$(1);
$(2);
const tmpDeleteObj = $(x);
const tmpNestedComplexRhs = delete tmpDeleteObj.y;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
$(1);
$(2);
const tmpDeleteObj$1 = $(x);
const tmpNestedComplexRhs$1 = delete tmpDeleteObj$1.y;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 1
 - 5: 2
 - 6: {}
 - 7: 2
 - 8: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
