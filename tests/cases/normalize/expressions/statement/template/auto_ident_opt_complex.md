# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > Template > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${$(b)?.x}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(`before  ${$(b)?.x}  after`);
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpTemplateExpr = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.x;
  tmpTemplateExpr = tmpChainElementObject;
}
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
let tmpTemplateExpr = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.x;
  tmpTemplateExpr = tmpChainElementObject;
}
const tmpCalleeParam = `before  ${tmpTemplateExpr}  after`;
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'before 1 after'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
