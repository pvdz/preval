# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident delete prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete $(arg).y + delete $(arg).y;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
delete $(arg).y + delete $(arg).y;
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
const tmpBinBothLhs = delete tmpDeleteObj.y;
const tmpDeleteObj$1 = $(arg);
const tmpBinBothRhs = delete tmpDeleteObj$1.y;
tmpBinBothLhs + tmpBinBothRhs;
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
delete tmpDeleteObj.y;
const tmpDeleteObj$1 = $(arg);
delete tmpDeleteObj$1.y;
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {
a: 999,
b: 1000
;
const c = $( a );
deletec.y;
const d = $( a );
deleted.y;
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: {}
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
