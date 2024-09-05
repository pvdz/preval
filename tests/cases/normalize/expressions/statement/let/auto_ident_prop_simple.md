# Preval test case

# auto_ident_prop_simple.md

> Normalize > Expressions > Statement > Let > Auto ident prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
let xyz = b.c;
$(xyz);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let xyz = b.c;
$(xyz);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let xyz = b.c;
$(xyz);
$(a, b);
`````

## Output


`````js filename=intro
$(1);
const a = { a: 999, b: 1000 };
const b = { c: 1 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = {
  a: 999,
  b: 1000,
};
const b = { c: 1 };
$( a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
