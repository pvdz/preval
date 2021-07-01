# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Statement > Template > Auto ident s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(`before  ${($(1), $(2), x)}  after`);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(`before  ` + String(($(1), $(2), x)) + `  after`);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$1 = String;
$(1);
$(2);
const tmpCalleeParam$1 = x;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
$(1);
$(2);
$(`before  1  after`);
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'before 1 after'
 - 4: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
