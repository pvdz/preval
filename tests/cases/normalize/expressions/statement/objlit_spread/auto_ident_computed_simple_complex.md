# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
({ ...b[$("c")] });
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
({ ...b[$(`c`)] });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $(`c`);
const tmpObjSpreadArg = tmpCompObj[tmpCompProp];
({ ...tmpObjSpreadArg });
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpCompProp = $(`c`);
const tmpObjSpreadArg = b[tmpCompProp];
({ ...tmpObjSpreadArg });
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = {
a: 999,
b: 1000
;
const c = $( "c" );
const d = a[ c ];
{ ... d };
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
