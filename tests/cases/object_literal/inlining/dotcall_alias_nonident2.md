# Preval test case

# dotcall_alias_nonident2.md

> Object literal > Inlining > Dotcall alias nonident2
>
>

## Input

`````js filename=intro
function order() {
  $($dotCall(alias, obj, undefined));
}
const g = function(){ return 'win'; };
const obj = {f: g};
const alias = 123..f;
$(order);
`````


## Settled


`````js filename=intro
const order /*:()=>undefined*/ = function () {
  debugger;
  const tmpCalleeParam /*:unknown*/ = $dotCall(alias, obj, undefined);
  $(tmpCalleeParam);
  return undefined;
};
const g /*:()=>string*/ = function $pcompiled() {
  debugger;
  return `win`;
};
const obj /*:object*/ /*truthy*/ = { f: g };
const alias /*:unknown*/ = $Number_prototype.f;
$(order);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const order = function () {
  $($dotCall(alias, obj, undefined));
};
const g = function $pcompiled() {
  return `win`;
};
const obj = { f: g };
const alias = $Number_prototype.f;
$(order);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $dotCall( c, d, undefined );
  $( b );
  return undefined;
};
const e = function f() {
  debugger;
  return "win";
};
const d = { f: e };
const c = $Number_prototype.f;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let order = function () {
  debugger;
  let tmpCalleeParam = $dotCall(alias, obj, undefined);
  $(tmpCalleeParam);
  return undefined;
};
const g = function () {
  debugger;
  return `win`;
};
const obj = { f: g };
const alias = $Number_prototype.f;
$(order);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
