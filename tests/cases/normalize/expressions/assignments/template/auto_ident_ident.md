# Preval test case

# auto_ident_ident.md

> normalize > expressions > assignments > template > auto_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = b)}  after`);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = b;
let tmpTemplateExpr = a;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpCalleeParam = `before  ${1}  after`;
$(tmpCalleeParam);
$(1, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before  1  after'
 - 2: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
