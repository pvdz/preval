# Preval test case

# ident_arrow2.md

> Normalize > Expressions > Statement > Template > Ident arrow2
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${function() {
  if (x) y;
}}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpTemplateExpr = function () {
  if (x) {
    y;
  }
};
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpTemplateExpr = function () {
  if (x) {
    y;
  }
};
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
$(tmpCalleeParam);
$(a);
`````

## Globals

BAD@! Found 2 implicit global bindings:

x, y

## Result

Should call `$` with:
 - 1: 'before function() { if (x) y;} after'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: BAD?!
 - 1: 'before function() {if (x) {y;}} after'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Final output calls: BAD!!
 - 1: 'before function() {if (x) {y;}} after'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined
