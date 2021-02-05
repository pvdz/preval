# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> normalize > expressions > assignments > binary_both > auto_ident_new_computed_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new (1, 2, b)["$"](1)) + (a = new (1, 2, b)["$"](1)));
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
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
const tmpNestedComplexRhs = new tmpNewCallee(1);
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
1;
2;
const tmpCompObj$1 = b;
const tmpNewCallee$1 = tmpCompObj$1.$;
const tmpNestedComplexRhs$1 = new tmpNewCallee$1(1);
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
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
const tmpNestedComplexRhs = new tmpNewCallee(1);
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpCompObj$1 = b;
const tmpNewCallee$1 = tmpCompObj$1.$;
const tmpNestedComplexRhs$1 = new tmpNewCallee$1(1);
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
 - 3: '[object Object][object Object]'
 - 4: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
