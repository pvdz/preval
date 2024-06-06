# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Objlit spread > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$({ ...(a = b = $(2)) });
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$({ ...(a = b = $(2)) });
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
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const tmpNestedComplexRhs = $(2);
const tmpCalleeParam = { ...tmpNestedComplexRhs };
$(tmpCalleeParam);
$(tmpNestedComplexRhs, tmpNestedComplexRhs);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = { ... a };
$( b );
$( a, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: {}
 - 3: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
