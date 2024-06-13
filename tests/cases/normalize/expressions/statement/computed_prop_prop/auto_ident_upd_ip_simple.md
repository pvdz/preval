# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident upd ip simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
obj[b++];
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
obj[b++];
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpPostUpdArgIdent = b;
b = b + 1;
const tmpCompProp = tmpPostUpdArgIdent;
tmpCompObj[tmpCompProp];
$(a, b);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const obj = {};
obj[1];
$(a, 2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = {};
b[ 1 ];
$( a, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
