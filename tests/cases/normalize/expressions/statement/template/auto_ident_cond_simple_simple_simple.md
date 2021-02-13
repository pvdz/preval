# Preval test case

# auto_ident_cond_simple_simple_simple.md

> normalize > expressions > statement > template > auto_ident_cond_simple_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${1 ? 2 : $($(100))}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr = undefined;
{
  tmpTemplateExpr = 2;
}
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpTemplateExpr = undefined;
{
  tmpTemplateExpr = 2;
}
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 'before  2  after'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same