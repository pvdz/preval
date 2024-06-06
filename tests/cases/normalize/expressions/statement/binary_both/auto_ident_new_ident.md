# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Statement > Binary both > Auto ident new ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
new $(1) + new $(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
new $(1) + new $(1);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = new $(1);
const tmpBinBothRhs = new $(1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = new $(1);
const tmpBinBothRhs = new $(1);
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 1 );
const b = new $( 1 );
a + b;
const c = {
a: 999,
b: 1000
;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
