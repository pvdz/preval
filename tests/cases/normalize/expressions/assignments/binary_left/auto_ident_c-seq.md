# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Binary left > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = ($(1), $(2), $(x))) + $(100));
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$((a = ($(1), $(2), $(x))) + $(100));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(1);
$(2);
a = $(x);
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output


`````js filename=intro
$(1);
$(2);
const a = $(1);
const tmpBinBothRhs = $(100);
const tmpCalleeParam = a + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 1 );
const b = $( 100 );
const c = a + b;
$( c );
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 100
 - 5: 101
 - 6: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
