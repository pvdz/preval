# Preval test case

# auto_ident_unary_minus_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident unary minus simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = -arg)}  after`);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$(`before  ` + String((a = -arg)) + `  after`);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
a = -arg;
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
$(`before  -1  after`);
$(-1, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before -1 after'
 - 2: -1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
