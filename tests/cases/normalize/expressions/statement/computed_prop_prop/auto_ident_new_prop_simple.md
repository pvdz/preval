# Preval test case

# auto_ident_new_prop_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident new prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[new b.$(1)];
$(a);
`````

## Settled


`````js filename=intro
const tmpCompProp /*:object*/ = new $(1);
const obj /*:object*/ = {};
obj[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = new $(1);
({}[tmpCompProp]);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
obj[new b.$(1)];
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpNewCallee = b.$;
const tmpCompProp = new tmpNewCallee(1);
tmpCompObj[tmpCompProp];
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
const b = {};
b[ a ];
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
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
