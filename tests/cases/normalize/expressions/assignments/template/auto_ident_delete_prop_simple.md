# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = delete arg.y)}  after`);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = delete arg.y), `string`) + `  after`);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
a = delete arg.y;
let tmpCallCallee$1 = a;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
const tmpBinBothRhs /*:string*/ = $coerce(a, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = delete a.y;
const c = $coerce( b, "string" );
const d = `before  ${c}  after`;
$( d );
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before true after'
 - 2: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
