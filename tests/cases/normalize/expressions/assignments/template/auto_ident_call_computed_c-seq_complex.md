# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> normalize > expressions > assignments > template > auto_ident_call_computed_c-seq_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(`before  ${(a = (1, 2, $(b))[$("$")](1))}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr;
1;
2;
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr;
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 'before  1  after'
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
