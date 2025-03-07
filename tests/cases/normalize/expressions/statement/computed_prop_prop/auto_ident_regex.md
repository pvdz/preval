# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[/foo/];
$(a);
`````

## Settled


`````js filename=intro
const obj /*:object*/ = {};
const tmpCompProp /*:regex*/ = /foo/;
obj[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = {};
const tmpCompProp = /foo/;
obj[tmpCompProp];
$({ a: 999, b: 1000 });
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

## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = /foo/;
a[ b ];
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
