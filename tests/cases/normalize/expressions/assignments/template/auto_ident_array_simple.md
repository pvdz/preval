# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Template > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ${(a = [1, 2, 3])}  after`);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce((a = [1, 2, 3]), `string`) + `  after`);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
a = [1, 2, 3];
let tmpCallCallee$1 = a;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
$(`before  1,2,3  after`);
const a = [1, 2, 3];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( "before  1,2,3  after" );
const a = [ 1, 2, 3 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before 1,2,3 after'
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
