# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident delete computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete arg["y"] + delete arg["y"];
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
delete arg[`y`] + delete arg[`y`];
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = delete arg.y;
const tmpBinBothRhs = delete arg.y;
tmpBinBothLhs + tmpBinBothRhs;
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
delete arg.y;
delete arg.y;
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
deletea.y;
deletea.y;
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
