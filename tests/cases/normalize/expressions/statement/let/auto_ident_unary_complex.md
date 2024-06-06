# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Let > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let xyz = typeof $(x);
$(xyz);
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let xyz = typeof $(x);
$(xyz);
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
let xyz = typeof tmpUnaryArg;
$(xyz);
$(a, x);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpUnaryArg = $(1);
const xyz = typeof tmpUnaryArg;
$(xyz);
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = $( 1 );
const c = typeofb;
$( c );
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number'
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
