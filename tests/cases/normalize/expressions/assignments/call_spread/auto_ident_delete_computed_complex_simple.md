# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > assignments > call_spread > auto_ident_delete_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$(...(a = delete $(x)["y"]));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
const tmpDeleteCompObj = $(x);
const tmpDeleteCompProp = 'y';
const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
a = tmpNestedComplexRhs;
tmpCalleeParamSpread = tmpNestedComplexRhs;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
const tmpDeleteCompObj = $(x);
const tmpNestedComplexRhs = delete tmpDeleteCompObj.y;
a = tmpNestedComplexRhs;
tmpCalleeParamSpread = tmpNestedComplexRhs;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same
