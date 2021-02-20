# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = b--)}  after`);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpPostUpdArgIdent = b;
b = b - 1;
a = tmpPostUpdArgIdent;
let tmpTemplateExpr = a;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
$('before  1  after');
$(1, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before  1  after'
 - 2: 1, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
