# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Binary both > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
(b = $(2)) + (b = $(2));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
(b = $(2)) + (b = $(2));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
let tmpBinBothLhs = b;
b = $(2);
let tmpBinBothRhs = b;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output


`````js filename=intro
const b = $(2);
const tmpClusterSSA_b = $(2);
b + tmpClusterSSA_b;
const a = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = $( 2 );
a + b;
const c = {
a: 999,
b: 1000
;
$( c, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
