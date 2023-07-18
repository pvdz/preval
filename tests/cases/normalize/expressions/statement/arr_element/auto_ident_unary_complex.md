# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
typeof $(x) + typeof $(x);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
typeof $(x) + typeof $(x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
const tmpBinBothLhs = typeof tmpUnaryArg;
const tmpUnaryArg$1 = $(x);
const tmpBinBothRhs = typeof tmpUnaryArg$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a, x);
`````

## Output

`````js filename=intro
$(1);
$(1);
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 1 );
const a = {
a: 999,
b: 1000
;
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
