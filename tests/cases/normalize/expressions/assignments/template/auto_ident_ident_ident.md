# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > assignments > template > auto_ident_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$(`before  ${(a = b = 2)}  after`);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
b = 2;
a = 2;
let tmpTemplateExpr = a;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
a = 2;
let tmpTemplateExpr = a;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
$(tmpCalleeParam);
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: 'before  2  after'
 - 2: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same