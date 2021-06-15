# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Assignments > Template > Auto ident unary tilde complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = ~$(100))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + (a = ~$(100)) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpUnaryArg = $(100);
a = ~tmpUnaryArg;
let tmpBinBothRhs = a;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const a = ~tmpUnaryArg;
const tmpBinLhs = `before  ` + a;
const tmpCalleeParam = tmpBinLhs + `  after`;
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'before -101 after'
 - 3: -101
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
