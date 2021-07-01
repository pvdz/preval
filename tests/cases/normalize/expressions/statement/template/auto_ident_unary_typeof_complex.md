# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Statement > Template > Auto ident unary typeof complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(`before  ${typeof $(arg)}  after`);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$(`before  ` + String(typeof $(arg)) + `  after`);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
const tmpUnaryArg = $(arg);
const tmpCalleeParam$1 = typeof tmpUnaryArg;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpUnaryArg = $(1);
const tmpCalleeParam$1 = typeof tmpUnaryArg;
const tmpCalleeParam = `before  ${tmpCalleeParam$1}  after`;
$(tmpCalleeParam);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'before number after'
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
