# Preval test case

# auto_ident_call_prop_s-seq.md

> normalize > expressions > assignments > arr_element > auto_ident_call_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b).$(1)) + (a = (1, 2, b).$(1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
1;
2;
const tmpCallObj = b;
const tmpNestedComplexRhs = tmpCallObj.$(1);
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
1;
2;
const tmpCallObj$1 = b;
const tmpNestedComplexRhs$1 = tmpCallObj$1.$(1);
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpCallObj = b;
const tmpNestedComplexRhs = tmpCallObj.$(1);
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpCallObj$1 = b;
const tmpNestedComplexRhs$1 = tmpCallObj$1.$(1);
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
