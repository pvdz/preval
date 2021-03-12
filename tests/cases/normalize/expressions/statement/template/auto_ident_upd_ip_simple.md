# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > Template > Auto ident upd ip simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(`before  ${b++}  after`);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(`before  ${b++}  after`);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpPostUpdArgIdent = b;
b = b + 1;
const tmpTemplateExpr = tmpPostUpdArgIdent;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$('before  1  after');
$(a, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before 1 after'
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
