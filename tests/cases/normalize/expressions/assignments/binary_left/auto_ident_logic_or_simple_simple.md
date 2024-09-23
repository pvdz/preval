# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident logic or simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 0 || 2) + $(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 0 || 2) + $(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 0;
if (a) {
} else {
  a = 2;
}
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothRhs = $(100);
const tmpCalleeParam /*:primitive*/ = 2 + tmpBinBothRhs;
$(tmpCalleeParam);
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = 2 + a;
$( b );
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 102
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
