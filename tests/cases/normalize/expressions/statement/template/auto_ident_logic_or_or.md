# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Template > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$($(0)) || $($(1)) || $($(2))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$($(0)) || $($(1)) || $($(2))}  after`);
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
  } else {
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
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(0);
let tmpTemplateExpr = $(tmpCalleeParam$1);
if (tmpTemplateExpr) {
} else {
  const tmpCalleeParam$2 = $(1);
  tmpTemplateExpr = $(tmpCalleeParam$2);
  if (tmpTemplateExpr) {
  } else {
    const tmpCalleeParam$3 = $(2);
    tmpTemplateExpr = $(tmpCalleeParam$3);
  }
}
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 'before 1 after'
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
