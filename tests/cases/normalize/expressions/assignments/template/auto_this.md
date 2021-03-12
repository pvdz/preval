# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Template > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = this)}  after`);
$(a);

//*/// (end of file artifact)
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = this)}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = this;
let tmpTemplateExpr = a;
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const SSA_a = this;
const tmpCalleeParam = `before  ${SSA_a}  after`;
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before undefined after'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
