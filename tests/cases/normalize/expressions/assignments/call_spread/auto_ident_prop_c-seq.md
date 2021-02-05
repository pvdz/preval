# Preval test case

# auto_ident_prop_c-seq.md

> normalize > expressions > assignments > call_spread > auto_ident_prop_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(...(a = (1, 2, $(b)).c));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
1;
2;
const tmpCompObj = $(b);
const tmpNestedComplexRhs = tmpCompObj.c;
a = tmpNestedComplexRhs;
tmpCalleeParamSpread = tmpNestedComplexRhs;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
const tmpCompObj = $(b);
const tmpNestedComplexRhs = tmpCompObj.c;
a = tmpNestedComplexRhs;
tmpCalleeParamSpread = tmpNestedComplexRhs;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same
