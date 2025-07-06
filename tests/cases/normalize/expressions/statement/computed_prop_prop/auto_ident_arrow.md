# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident arrow
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[() => {}];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
$coerce(tmpCalleeParam, `string`);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
String(function $pcompiled() {});
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
  debugger;
  return undefined;
};
$coerce( a, "string" );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCalleeParam = function () {
  debugger;
  return undefined;
};
tmpCompObj[tmpCalleeParam];
$(a);
`````


## Todos triggered


- (todo) serialization of function, fallback if we know the function is not going to be a builtin...


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
