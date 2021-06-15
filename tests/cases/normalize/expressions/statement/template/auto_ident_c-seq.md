# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > Template > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(`before  ${($(1), $(2), $(x))}  after`);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(`before  ` + ($(1), $(2), $(x)) + `  after`);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
$(1);
$(2);
const tmpBinBothRhs = $(x);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpBinBothRhs = $(1);
const tmpBinLhs = `before  ` + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + `  after`;
$(tmpCalleeParam);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 'before 1 after'
 - 5: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
