# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Assignments > Template > Auto ident prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${(a = (1, 2, b).c)}  after`);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = (1, 2, b).c), `string`) + `  after`);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpAssignRhsProp = b;
a = tmpAssignRhsProp.c;
let tmpCallCallee$1 = a;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
$(`before  1  after`);
const b /*:object*/ = { c: 1 };
$(1, b);
`````

## PST Output

With rename=true

`````js filename=intro
$( "before  1  after" );
const a = { c: 1 };
$( 1, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before 1 after'
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
