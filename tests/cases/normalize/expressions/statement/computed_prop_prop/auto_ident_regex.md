# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[/foo/];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[/foo/];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCompProp = /foo/;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const obj = {};
const tmpCompProp = /foo/;
obj[tmpCompProp];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = {};
const c = /foo/;
b[ c ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
