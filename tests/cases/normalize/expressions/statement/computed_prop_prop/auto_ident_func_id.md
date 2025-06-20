# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident func id
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[function f() {}];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:()=>unknown*/ = function () {
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
$coerce(function () {}, `string`);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
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
const f = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam = f;
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
