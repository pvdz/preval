# Preval test case

# this_method_escaping.md

> Object literal > Inlining > This method escaping
>
>

## Input

`````js filename=intro
const obj = {f: function(){ $(this.f); return 'win'; }};
$(obj.f());
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:()=>string*/ = function () {
  const tmpPrevalAliasThis /*:object*/ /*truthy*/ = this;
  debugger;
  const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasThis.f;
  $(tmpCalleeParam);
  return `win`;
};
const obj /*:object*/ /*truthy*/ = { f: tmpObjLitVal };
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpObjLitVal, obj, `f`);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = function () {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis.f);
  return `win`;
};
$($dotCall(tmpObjLitVal, { f: tmpObjLitVal }, `f`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = b.f;
  $( c );
  return "win";
};
const d = { f: a };
const e = $dotCall( a, d, "f" );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis.f;
  $(tmpCalleeParam);
  return `win`;
};
const obj = { f: tmpObjLitVal };
const tmpMCF = obj.f;
let tmpCalleeParam$1 = $dotCall(tmpMCF, obj, `f`);
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: 'win'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
