# Preval test case

# auto_ident_unary_tilde_simple.md

> normalize > expressions > assignments > template > auto_ident_unary_tilde_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = ~arg)}  after`);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = ~arg;
let tmpTemplateExpr = a;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const tmpCalleeParam = `before  ${-2}  after`;
$(tmpCalleeParam);
$(-2, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before  -2  after'
 - 2: -2, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
