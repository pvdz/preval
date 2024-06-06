# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = ++b)["a"];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
(a = ++b)[`a`];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpCompObj = a;
tmpCompObj.a;
$(a, b);
`````

## Output


`````js filename=intro
(2).a;
$(2, 2);
`````

## PST Output

With rename=true

`````js filename=intro
2.a;
$( 2, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
