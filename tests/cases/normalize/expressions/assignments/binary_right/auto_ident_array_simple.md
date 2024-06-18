# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = [1, 2, 3]));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = [1, 2, 3]));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
a = [1, 2, 3];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpStringConcatR = $coerce(tmpBinBothLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}1,2,3`;
$(tmpCalleeParam);
const a = [1, 2, 3];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = $coerce( a, "plustr" );
const c = `${tmpStringConcatR}1,2,3`;
$( c );
const d = [ 1, 2, 3 ];
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '1001,2,3'
 - 3: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
