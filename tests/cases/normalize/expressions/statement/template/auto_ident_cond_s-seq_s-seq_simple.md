# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> normalize > expressions > statement > template > auto_ident_cond_s-seq_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(10, 20, 30) ? (40, 50, 60) : $($(100))}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr = undefined;
10;
20;
const tmpIfTest = 30;
if (tmpIfTest) {
  40;
  50;
  tmpTemplateExpr = 60;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  tmpTemplateExpr = tmpCallCallee$1(tmpCalleeParam$1);
}
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr = undefined;
tmpTemplateExpr = 60;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 'before  60  after'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
