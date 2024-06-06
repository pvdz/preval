# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident unary typeof simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$([...(a = typeof arg)]);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$([...(a = typeof arg)]);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = typeof arg;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const tmpCalleeParam = [`n`, `u`, `m`, `b`, `e`, `r`];
$(tmpCalleeParam);
$(`number`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "n", "u", "m", "b", "e", "r" ];
$( a );
$( "number", 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['n', 'u', 'm', 'b', 'e', 'r']
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
