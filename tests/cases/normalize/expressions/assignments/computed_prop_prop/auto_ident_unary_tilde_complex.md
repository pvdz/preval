# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident unary tilde complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = ~$(100))];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = ~$(100))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpUnaryArg = $(100);
a = ~tmpUnaryArg;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const a = ~tmpUnaryArg;
const obj = {};
obj[a];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = ~a;
const c = {};
c[ b ];
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: -101
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
