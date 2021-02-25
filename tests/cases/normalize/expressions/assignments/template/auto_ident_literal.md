# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Template > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = "foo")}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 'foo';
let tmpTemplateExpr = a;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
$('before  foo  after');
$('foo');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before foo after'
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
