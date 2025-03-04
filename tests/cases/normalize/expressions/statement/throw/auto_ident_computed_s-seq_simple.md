# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
throw (1, 2, b)[$("c")];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
throw (1, 2, b)[$(`c`)];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $(`c`);
const tmpThrowArg = tmpCompObj[tmpCompProp];
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 1 };
const tmpThrowArg /*:unknown*/ = b[tmpCompProp];
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
throw c;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
