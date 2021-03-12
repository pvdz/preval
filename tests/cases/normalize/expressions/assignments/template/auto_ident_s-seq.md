# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > Template > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = ($(1), $(2), x))}  after`);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(`before  ${(a = ($(1), $(2), x))}  after`);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(1);
$(2);
a = x;
let tmpTemplateExpr = a;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
$(1);
$(2);
$('before  1  after');
$(1, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'before 1 after'
 - 4: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
