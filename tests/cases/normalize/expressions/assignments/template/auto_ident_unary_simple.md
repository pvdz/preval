# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > assignments > template > auto_ident_unary_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = typeof x)}  after`);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr;
const tmpNestedComplexRhs = typeof x;
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr;
a = 'number';
tmpTemplateExpr = 'number';
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 'before  number  after'
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
