# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = void $(100))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + String((a = void $(100))) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
$(100);
a = undefined;
let tmpCalleeParam$1 = a;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
$(100);
$(`before  undefined  after`);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'before undefined after'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
