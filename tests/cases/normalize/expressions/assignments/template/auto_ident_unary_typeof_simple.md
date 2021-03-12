# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident unary typeof simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = typeof arg)}  after`);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$(`before  ${(a = typeof arg)}  after`);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = typeof arg;
let tmpTemplateExpr = a;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
$('before  number  after');
$('number', 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before number after'
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
