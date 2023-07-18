# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident unary tilde complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
~$(100) + ~$(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
~$(100) + ~$(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const tmpBinBothLhs = ~tmpUnaryArg;
const tmpUnaryArg$1 = $(100);
const tmpBinBothRhs = ~tmpUnaryArg$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
+tmpUnaryArg;
const tmpUnaryArg$1 = $(100);
+tmpUnaryArg$1;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
+a;
const b = $( 100 );
+b;
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
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
