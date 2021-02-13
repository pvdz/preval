# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > statement > template > auto_ident_logic_and_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${1 && $($(1))}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr = 1;
if (tmpTemplateExpr) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpTemplateExpr = tmpCallCallee$1(tmpCalleeParam$1);
}
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpTemplateExpr = 1;
if (tmpTemplateExpr) {
  const tmpCalleeParam$1 = $(1);
  tmpTemplateExpr = $(tmpCalleeParam$1);
}
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'before  1  after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same