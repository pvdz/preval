# Preval test case

# auto_ident_unary_minus_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident unary minus simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = -arg) + $(100));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$((a = -arg) + $(100));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = -arg;
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = -1 + tmpBinBothRhs;
$(tmpCalleeParam);
$(-1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = -1 + a;
$( b );
$( -1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 99
 - 3: -1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
