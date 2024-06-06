# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > Binary right > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(100) + ++b;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(100) + ++b;
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
b = b + 1;
let tmpBinBothRhs = b;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
tmpBinBothLhs + 0;
const a = { a: 999, b: 1000 };
$(a, 2);
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
$( b, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
