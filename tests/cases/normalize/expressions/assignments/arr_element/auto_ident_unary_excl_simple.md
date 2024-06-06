# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = !arg) + (a = !arg));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$((a = !arg) + (a = !arg));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = !arg;
let tmpBinBothLhs = a;
a = !arg;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
$(0);
$(false, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
$( false, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
