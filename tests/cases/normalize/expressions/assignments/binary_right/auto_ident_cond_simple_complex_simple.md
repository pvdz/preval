# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident cond simple complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = 1 ? $(2) : $($(100))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = 1 ? $(2) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
a = $(2);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const a /*:unknown*/ = $(2);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( 2 );
const c = a + b;
$( c );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: 102
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
