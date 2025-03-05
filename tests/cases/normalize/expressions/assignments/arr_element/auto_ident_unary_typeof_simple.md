# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident unary typeof simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = typeof arg) + (a = typeof arg));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$((a = typeof arg) + (a = typeof arg));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = typeof arg;
let tmpBinBothLhs = a;
a = typeof arg;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
$(`numbernumber`);
$(`number`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( "numbernumber" );
$( "number", 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'numbernumber'
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
