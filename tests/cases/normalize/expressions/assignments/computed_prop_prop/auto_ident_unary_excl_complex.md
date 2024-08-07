# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = !$(100))];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = !$(100))];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const obj = {};
const tmpUnaryArg = $(100);
const a = !tmpUnaryArg;
obj[a];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = $( 100 );
const c = !b;
a[ c ];
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
