# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Binary right > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$($(100) + (a = typeof $(x)));
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$($(100) + (a = typeof $(x)));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
const tmpUnaryArg = $(x);
a = typeof tmpUnaryArg;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpUnaryArg /*:unknown*/ = $(1);
const a /*:string*/ = typeof tmpUnaryArg;
const tmpCalleeParam /*:string*/ = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( 1 );
const c = typeof b;
const d = a + c;
$( d );
$( c, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: '100number'
 - 4: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
