# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Binary both > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

Probably need to clean this mess up

## Input

`````js filename=intro
const f = (a,b,c) => arguments;
$(f(1, 2, 3));
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = arguments) + (a = arguments));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = arguments;
let tmpBinBothLhs = a;
a = arguments;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const a = arguments;
const tmpClusterSSA_a = arguments;
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = arguments;
const b = arguments;
const c = a + b;
$( c );
$( b );
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: '[object Arguments][object Arguments]'
 - 2: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
