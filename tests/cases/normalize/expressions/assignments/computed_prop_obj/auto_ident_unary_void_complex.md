# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = void $(100))["a"];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = void $(100))[`a`];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
$(100);
a = undefined;
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
$(100);
undefined.a;
throw `[Preval]: Can not reach here`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
undefined.a;
throw "[Preval]: Can not reach here";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
