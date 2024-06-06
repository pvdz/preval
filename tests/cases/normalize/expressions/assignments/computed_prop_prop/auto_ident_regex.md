# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = /foo/)];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = /foo/)];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = /foo/;
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const obj = {};
const a = /foo/;
obj[a];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = /foo/;
a[ b ];
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
