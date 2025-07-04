# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Statement > Let > Auto ident func anon
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = function () {};
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const xyz /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
$(xyz);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function $pcompiled() {});
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return undefined;
};
$( a );
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = function () {
  debugger;
  return undefined;
};
$(xyz);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
