# Preval test case

# id_write.md

> Normalize > Function > Expr > Id write
>
> Function recursion by referencing a function expr id

For this reason we must create a constant outside of the function and a local alias as let. The local alias should be eliminated if it has no writes.

## Options

- skipEval

## Input

`````js filename=intro
const f = function funcexprname() {
  funcexprname = 20; // This throws in strict mode because `funcexprname` is a constant.
  return funcexprname;
};
const x = f();
$(x, typeof f);
`````


## Settled


`````js filename=intro
let funcexprname /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  funcexprname = 20;
  return 20;
};
const f /*:unknown*/ = funcexprname;
const tmpCalleeParam /*:unknown*/ = funcexprname();
const tmpCalleeParam$1 /*:string*/ /*truthy*/ = typeof f;
$(tmpCalleeParam, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let funcexprname = function $pcompiled() {
  funcexprname = 20;
  return 20;
};
const f = funcexprname;
$(funcexprname(), typeof f);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = function $pcompiled() {
  debugger;
  a = 20;
  return 20;
};
const b = a;
const c = a();
const d = typeof b;
$( c, d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let funcexprname = function () {
  debugger;
  funcexprname = 20;
  return funcexprname;
};
const f = funcexprname;
const x = funcexprname();
let tmpCalleeParam = x;
let tmpCalleeParam$1 = typeof f;
$(tmpCalleeParam, tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
