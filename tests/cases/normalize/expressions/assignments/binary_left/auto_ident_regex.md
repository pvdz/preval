# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Binary left > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = /foo/) + $(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = /foo/) + $(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = /foo/;
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const a = /foo/;
const tmpBinBothRhs = $(100);
const tmpStringConcatL = $coerce(tmpBinBothRhs, `plustr`);
const tmpCalleeParam = `/foo/${tmpStringConcatL}`;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /foo/;
const b = $( 100 );
const c = $coerce( b, "plustr" );
const d = `/foo/${tmpStringConcatL}`;
$( d );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '/foo/100'
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
