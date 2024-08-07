# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Statement > Let > Auto ident delete prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
let xyz = delete arg.y;
$(xyz);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let xyz = delete arg.y;
$(xyz);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let xyz = delete arg.y;
$(xyz);
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const xyz = delete arg.y;
$(xyz);
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {
  a: 999,
  b: 1000,
};
const c = delete a.y;
$( c );
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
