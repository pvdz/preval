# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = ~arg) + $(100));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$((a = ~arg) + $(100));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = ~arg;
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const tmpBinBothRhs = $(100);
const tmpCalleeParam /*:primitive*/ = -2 + tmpBinBothRhs;
$(tmpCalleeParam);
$(-2, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = -2 + a;
$( b );
$( -2, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 98
 - 3: -2, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
