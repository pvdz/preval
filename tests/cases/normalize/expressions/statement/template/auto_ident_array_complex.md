# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Template > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${[$(1), 2, $(3)]}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${[$(1), 2, $(3)]}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
const tmpTemplateExpr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const tmpTemplateExpr = [tmpArrElement, 2, tmpArrElement$3];
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 'before 1,2,3 after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
