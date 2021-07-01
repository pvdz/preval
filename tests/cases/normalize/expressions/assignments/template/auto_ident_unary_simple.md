# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(`before  ${(a = typeof x)}  after`);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(`before  ` + String((a = typeof x)) + `  after`);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
a = typeof x;
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
$(`before  number  after`);
$(`number`, 1);
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
