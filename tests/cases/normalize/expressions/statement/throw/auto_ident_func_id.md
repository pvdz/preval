# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Statement > Throw > Auto ident func id
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw function f() {};
$(a);
`````


## Settled


`````js filename=intro
const tmpThrowArg /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = function $pcompiled() {};
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
  debugger;
  return undefined;
};
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const f = function () {
  debugger;
  return undefined;
};
const tmpThrowArg = f;
throw tmpThrowArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ function() {return undefined;} ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: BAD!!
 - !eval returned: ('<crash[ function() {} ]>')
