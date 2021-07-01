# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Statement > Template > Auto ident delete prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${delete arg.y}  after`);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + String(delete arg.y) + `  after`);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
const tmpCalleeParam$1 = delete arg.y;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = delete arg.y;
const tmpBinBothRhs = String(tmpCalleeParam$1);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before true after'
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
