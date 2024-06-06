# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident cond simple s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 ? (40, 50, 60) : $($(100))) + $(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 ? (40, 50, 60) : $($(100))) + $(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 60;
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothRhs = $(100);
const tmpCalleeParam = 60 + tmpBinBothRhs;
$(tmpCalleeParam);
$(60);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = 60 + a;
$( b );
$( 60 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 160
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
