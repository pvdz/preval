# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Statement > Template > Auto ident ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$(`before  ${(b = 2)}  after`);
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((b = 2), `string`) + `  after`);
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
b = 2;
let tmpCallCallee$1 = b;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output


`````js filename=intro
$(`before  2  after`);
const a = { a: 999, b: 1000 };
$(a, 2, 2);
`````

## PST Output

With rename=true

`````js filename=intro
$( "before  2  after" );
const a = {
a: 999,
b: 1000
;
$( a, 2, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before 2 after'
 - 2: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
