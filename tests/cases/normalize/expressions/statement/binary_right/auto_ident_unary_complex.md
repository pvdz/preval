# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Binary right > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(100) + typeof $(x);
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(100) + typeof $(x);
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpUnaryArg = $(x);
const tmpBinBothRhs = typeof tmpUnaryArg;
tmpBinBothLhs + tmpBinBothRhs;
$(a, x);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
$(1);
$coerce(tmpBinBothLhs, `plustr`);
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
$( 1 );
$coerce( a, "plustr" );
const b = {
  a: 999,
  b: 1000,
};
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
