# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Binary right > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = []));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = []));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
a = [];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpCalleeParam = $coerce(tmpBinBothLhs, `plustr`);
$(tmpCalleeParam);
const a = [];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = $coerce( a, "plustr" );
$( b );
const c = [];
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '100'
 - 3: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
