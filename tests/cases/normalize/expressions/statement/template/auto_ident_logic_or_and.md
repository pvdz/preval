# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > statement > template > auto_ident_logic_or_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$($(0)) || ($($(1)) && $($(2)))}  after`);
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
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  tmpTemplateExpr = tmpCallCallee$2(tmpCalleeParam$2);
  if (tmpTemplateExpr) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpTemplateExpr = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
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
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 'before  2  after'
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
