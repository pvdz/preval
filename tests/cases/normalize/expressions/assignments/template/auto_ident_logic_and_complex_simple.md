# Preval test case

# auto_ident_logic_and_complex_simple.md

> normalize > expressions > assignments > template > auto_ident_logic_and_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $($(1)) && 2)}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpNestedComplexRhs) {
  tmpNestedComplexRhs = 2;
}
a = tmpNestedComplexRhs;
tmpTemplateExpr = tmpNestedComplexRhs;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'before  2  after'
 - 4: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
