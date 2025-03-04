# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) + $(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) + $(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = [1, 2, 3];
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpStringConcatL /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpCalleeParam /*:string*/ = `1,2,3${tmpStringConcatL}`;
$(tmpCalleeParam);
const a /*:array*/ = [1, 2, 3];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = $coerce( a, "plustr" );
const c = `1,2,3${b}`;
$( c );
const d = [ 1, 2, 3 ];
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '1,2,3100'
 - 3: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
