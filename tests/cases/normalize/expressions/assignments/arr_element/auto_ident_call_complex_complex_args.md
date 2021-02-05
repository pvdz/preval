# Preval test case

# auto_ident_call_complex_complex_args.md

> normalize > expressions > assignments > arr_element > auto_ident_call_complex_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $($)($(1), $(2))) + (a = $($)($(1), $(2))));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpCallCallee$1 = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
const tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpCallCallee$2 = $($);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$4 = $(2);
const tmpNestedComplexRhs$1 = tmpCallCallee$2(tmpCalleeParam$3, tmpCalleeParam$4);
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
({ $: $ });
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpCallCallee$1 = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$2 = $(2);
const tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpCallCallee$2 = $($);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$4 = $(2);
const tmpNestedComplexRhs$1 = tmpCallCallee$2(tmpCalleeParam$3, tmpCalleeParam$4);
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: '<$>'
 - 6: 1
 - 7: 2
 - 8: 1, 2
 - 9: 2
 - 10: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
