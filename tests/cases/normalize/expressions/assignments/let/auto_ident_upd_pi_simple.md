# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Let > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let xyz = (a = ++b);
$(xyz);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let xyz = (a = ++b);
$(xyz);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let xyz = a;
$(xyz);
$(a, b);
`````

## Output


`````js filename=intro
$(2);
$(2, 2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
$( 2, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
