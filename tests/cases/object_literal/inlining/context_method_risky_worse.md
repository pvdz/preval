# Preval test case

# context_method_risky_worse.md

> Object literal > Inlining > Context method risky worse
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
$(obj.encode.call(obj)); // Indirect call. Parent node of `obj.encode` is not a call expression
$(obj.str); // changed!
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  tmpPrevalAliasThis.str = `changed`;
  const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasThis.str;
  $(tmpCalleeParam);
  return undefined;
};
const obj /*:object*/ = { encode: tmpObjLitVal, str: `abc` };
const tmpCalleeParam$1 /*:unknown*/ = tmpObjLitVal.call(obj);
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
$(tmpObjLitVal.call(obj));
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
const e = a.call( d );
$( e );
const f = d.str;
$( f );
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
