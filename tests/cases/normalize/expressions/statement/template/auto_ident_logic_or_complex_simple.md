# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > statement > template > auto_ident_logic_or_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$($(0)) || 2}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
let tmpTemplateExpr = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpTemplateExpr) {
} else {
  tmpTemplateExpr = 2;
}
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(0);
let tmpTemplateExpr = $(tmpCalleeParam$1);
if (tmpTemplateExpr) {
} else {
  tmpTemplateExpr = 2;
}
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 'before  2  after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same