# Preval test case

# context_method_risky.md

> Object literal > Inlining > Context method risky
>
> This is a generalization of a pattern found in an (obfuscated) encode decode script. Object does not escape, calls methods that use `this`.

## Input

`````js filename=intro
const obj = {
  encode: function(){
    // This is why you can't _just_ inline property reads
    this.str = 'changed'; 
    $(this.str);
  },
  str: 'abc',
};
$(obj.encode());
$(obj.str); // changed!
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ /*truthy*/ = this;
  debugger;
  tmpPrevalAliasThis.str = `changed`;
  const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasThis.str;
  $(tmpCalleeParam);
  return undefined;
};
const obj /*:object*/ /*truthy*/ = { encode: tmpObjLitVal, str: `abc` };
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpObjLitVal, obj, `encode`);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = obj.str;
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = function () {
  const tmpPrevalAliasThis = this;
  tmpPrevalAliasThis.str = `changed`;
  $(tmpPrevalAliasThis.str);
};
const obj = { encode: tmpObjLitVal, str: `abc` };
$($dotCall(tmpObjLitVal, obj, `encode`));
$(obj.str);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  b.str = "changed";
  const c = b.str;
  $( c );
  return undefined;
};
const d = {
  encode: a,
  str: "abc",
};
const e = $dotCall( a, d, "encode" );
$( e );
const f = d.str;
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  tmpPrevalAliasThis.str = `changed`;
  let tmpCalleeParam = tmpPrevalAliasThis.str;
  $(tmpCalleeParam);
  return undefined;
};
const obj = { encode: tmpObjLitVal, str: `abc` };
const tmpMCF = obj.encode;
let tmpCalleeParam$1 = $dotCall(tmpMCF, obj, `encode`);
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = obj.str;
$(tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'changed'
 - 2: undefined
 - 3: 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
