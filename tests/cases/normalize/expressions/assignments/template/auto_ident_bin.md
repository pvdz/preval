# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Template > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = $(1) + $(2))}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + String((a = $(1) + $(2))) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
a = tmpBinBothLhs$1 + tmpBinBothRhs$1;
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
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const a = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothRhs = String(a);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'before 3 after'
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
