# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = !$(100)) + (a = !$(100)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = !$(100)) + (a = !$(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let tmpBinBothLhs = a;
const tmpUnaryArg$1 = $(100);
a = !tmpUnaryArg$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const tmpUnaryArg$1 /*:unknown*/ = $(100);
const a /*:boolean*/ = !tmpUnaryArg;
const tmpClusterSSA_a /*:boolean*/ = !tmpUnaryArg$1;
const tmpCalleeParam /*:number*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( 100 );
const c = !a;
const d = !b;
const e = c + d;
$( e );
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 0
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
