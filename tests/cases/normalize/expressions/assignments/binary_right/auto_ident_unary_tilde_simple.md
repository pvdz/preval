# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$($(100) + (a = ~arg));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$($(100) + (a = ~arg));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
a = ~arg;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + -2;
$(tmpCalleeParam);
$(-2, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = a + -2;
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
