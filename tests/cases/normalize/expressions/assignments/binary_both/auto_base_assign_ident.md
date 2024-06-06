# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Binary both > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b = $(2)) + (a = b = $(2)));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = b = $(2)) + (a = b = $(2)));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNestedComplexRhs = $(2);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpBinBothLhs = a;
const tmpNestedComplexRhs$1 = $(2);
b = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const tmpNestedComplexRhs = $(2);
const tmpNestedComplexRhs$1 = $(2);
const tmpCalleeParam = tmpNestedComplexRhs + tmpNestedComplexRhs$1;
$(tmpCalleeParam);
$(tmpNestedComplexRhs$1, tmpNestedComplexRhs$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = $( 2 );
const c = a + b;
$( c );
$( b, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 4
 - 4: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
