# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > Template > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${$(1) + $(2)}  after`);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce($(1) + $(2), `string`) + `  after`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpCallCallee$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpCallCallee$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = $( 1 );
const c = $( 2 );
const d = b + c;
const e = $coerce( d, "string" );
const f = `before  ${[object Object]}  after`;
$( f );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'before 3 after'
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
