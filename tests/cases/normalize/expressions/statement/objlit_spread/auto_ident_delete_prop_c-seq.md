# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
({ ...delete ($(1), $(2), $(arg)).y });
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
({ ...delete ($(1), $(2), $(arg)).y });
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
const tmpObjSpreadArg = delete tmpDeleteObj.y;
({ ...tmpObjSpreadArg });
$(a, arg);
`````

## Output


`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const tmpObjSpreadArg = delete tmpDeleteObj.y;
({ ...tmpObjSpreadArg });
const a = { a: 999, b: 1000 };
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
{ ... c };
const d = {
  a: 999,
  b: 1000,
};
$( d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
