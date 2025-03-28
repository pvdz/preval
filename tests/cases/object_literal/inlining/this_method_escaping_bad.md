# Preval test case

# this_method_escaping_bad.md

> Object literal > Inlining > This method escaping bad
>
>

## Input

`````js filename=intro
function evil(func) {
  $('once');
  func.call({f: 1, x: 'burn'});
}
const obj = {
  x: 'pass', f: function(){
    if (this.x === 'burn') return $('burned');
    evil(this.f);                                     // func escapes here
    $(this.x); 
    return 'win';
  }
};
$(obj.f());
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:()=>unknown*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpBinLhs /*:unknown*/ = tmpPrevalAliasThis.x;
  const tmpIfTest /*:boolean*/ = tmpBinLhs === `burn`;
  if (tmpIfTest) {
    const tmpReturnArg /*:unknown*/ = $(`burned`);
    return tmpReturnArg;
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = tmpPrevalAliasThis.f;
    $(`once`);
    const tmpCallVal /*:unknown*/ = tmpCalleeParam$1.call;
    const tmpCalleeParam /*:object*/ = { f: 1, x: `burn` };
    $dotCall(tmpCallVal, tmpCalleeParam$1, `call`, tmpCalleeParam);
    const tmpCalleeParam$3 /*:unknown*/ = tmpPrevalAliasThis.x;
    $(tmpCalleeParam$3);
    return `win`;
  }
};
const obj /*:object*/ = { x: `pass`, f: tmpObjLitVal$1 };
const tmpCalleeParam$5 /*:unknown*/ = obj.f();
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis = this;
  if (tmpPrevalAliasThis.x === `burn`) {
    const tmpReturnArg = $(`burned`);
    return tmpReturnArg;
  } else {
    const tmpCalleeParam$1 = tmpPrevalAliasThis.f;
    $(`once`);
    tmpCalleeParam$1.call({ f: 1, x: `burn` });
    $(tmpPrevalAliasThis.x);
    return `win`;
  }
};
$({ x: `pass`, f: tmpObjLitVal$1 }.f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = b.x;
  const d = c === "burn";
  if (d) {
    const e = $( "burned" );
    return e;
  }
  else {
    const f = b.f;
    $( "once" );
    const g = f.call;
    const h = {
      f: 1,
      x: "burn",
    };
    $dotCall( g, f, "call", h );
    const i = b.x;
    $( i );
    return "win";
  }
};
const j = {
  x: "pass",
  f: a,
};
const k = j.f();
$( k );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'once'
 - 2: 'burned'
 - 3: 'pass'
 - 4: 'win'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
