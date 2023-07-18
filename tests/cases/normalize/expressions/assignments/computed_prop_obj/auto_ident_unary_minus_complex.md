# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = -$(100))["a"];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = -$(100))[`a`];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpUnaryArg = $(100);
a = -tmpUnaryArg;
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const a = -tmpUnaryArg;
a.a;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = -a;
b.a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: -100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
