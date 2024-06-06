# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > Binary left > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
--b + $(100);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
--b + $(100);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = b - 1;
let tmpBinBothLhs = b;
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output


`````js filename=intro
const tmpBinBothRhs = $(100);
tmpBinBothRhs + 0;
const a = { a: 999, b: 1000 };
$(a, 0);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
a + 0;
const b = {
a: 999,
b: 1000
;
$( b, 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
