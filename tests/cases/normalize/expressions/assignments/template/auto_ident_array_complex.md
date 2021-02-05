# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > assignments > template > auto_ident_array_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = [$(1), 2, $(3)])}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr;
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$2 = $(3);
const tmpNestedComplexRhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr;
const tmpArrElement = $(1);
const tmpArrElement$2 = $(3);
const tmpNestedComplexRhs = [tmpArrElement, 2, tmpArrElement$2];
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 'before  1,2,3  after'
 - 4: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
