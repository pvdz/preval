# Preval test case

# dotcall_alias_nonident.md

> Object literal > Inlining > Dotcall alias nonident
>
>

## Input

`````js filename=intro
function order() {
  $($dotCall(alias, obj, undefined));
}
const g = function(){ return 'win'; };
const obj = {f: g};
const alias = 123['f f'];
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
const g /*:()=>string*/ = function () {
  debugger;
  return `win`;
};
const obj /*:object*/ = { f: g };
const alias /*:unknown*/ = $Number_prototype[`f f`];
$(order);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const order = function () {
  $($dotCall(alias, obj, undefined));
};
const g = function () {
  return `win`;
};
const obj = { f: g };
const alias = $Number_prototype[`f f`];
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
const e = function() {
  debugger;
  return "win";
};
const d = { f: e };
const c = $Number_prototype[ "f f" ];
$( a );
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
