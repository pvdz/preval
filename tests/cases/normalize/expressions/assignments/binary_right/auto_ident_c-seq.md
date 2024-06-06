# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Binary right > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$($(100) + (a = ($(1), $(2), $(x))));
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$($(100) + (a = ($(1), $(2), $(x))));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
$(1);
$(2);
a = $(x);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
$(1);
$(2);
const a = $(1);
const tmpCalleeParam = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
$( 1 );
$( 2 );
const b = $( 1 );
const c = a + b;
$( c );
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 101
 - 6: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
