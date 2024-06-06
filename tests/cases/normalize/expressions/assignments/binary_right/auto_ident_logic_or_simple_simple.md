# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident logic or simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = 0 || 2));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = 0 || 2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
a = 0;
if (a) {
} else {
  a = 2;
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + 2;
$(tmpCalleeParam);
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = a + 2;
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
