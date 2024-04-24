# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = typeof $(arg)) + (a = typeof $(arg)));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$((a = typeof $(arg)) + (a = typeof $(arg)));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
let tmpBinBothLhs = a;
const tmpUnaryArg$1 = $(arg);
a = typeof tmpUnaryArg$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(1);
let a = typeof tmpUnaryArg;
const tmpBinBothLhs = a;
const tmpUnaryArg$1 = $(1);
a = typeof tmpUnaryArg$1;
const tmpCalleeParam = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = typeofa;
const c = b;
const d = $( 1 );
b = typeofd;
const e = c + b;
$( e );
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'numbernumber'
 - 4: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
