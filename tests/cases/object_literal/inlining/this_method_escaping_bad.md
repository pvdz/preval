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
  const tmpPrevalAliasThis /*:object*/ /*truthy*/ = this;
  debugger;
  const tmpBinLhs /*:unknown*/ = tmpPrevalAliasThis.x;
  const tmpIfTest /*:boolean*/ = tmpBinLhs === `burn`;
  if (tmpIfTest) {
    const tmpReturnArg /*:unknown*/ = $(`burned`);
    return tmpReturnArg;
  } else {
    const func /*:unknown*/ = tmpPrevalAliasThis.f;
    $(`once`);
    const tmpMCF /*:unknown*/ = func.call;
    const tmpMCP /*:object*/ /*truthy*/ = { f: 1, x: `burn` };
    $dotCall(tmpMCF, func, `call`, tmpMCP);
    const tmpCalleeParam$1 /*:unknown*/ = tmpPrevalAliasThis.x;
    $(tmpCalleeParam$1);
    return `win`;
  }
};
const obj /*:object*/ /*truthy*/ = { x: `pass`, f: tmpObjLitVal$1 };
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpObjLitVal$1, obj, `f`);
$(tmpCalleeParam$3);
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
    const func = tmpPrevalAliasThis.f;
    $(`once`);
    func.call({ f: 1, x: `burn` });
    $(tmpPrevalAliasThis.x);
    return `win`;
  }
};
$($dotCall(tmpObjLitVal$1, { x: `pass`, f: tmpObjLitVal$1 }, `f`));
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
const k = $dotCall( a, j, "f" );
$( k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let evil = function ($$0) {
  let func = $$0;
  debugger;
  $(`once`);
  const tmpMCF = func.call;
  const tmpMCP = { f: 1, x: `burn` };
  $dotCall(tmpMCF, func, `call`, tmpMCP);
  return undefined;
};
const tmpObjLitVal = `pass`;
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpBinLhs = tmpPrevalAliasThis.x;
  const tmpIfTest = tmpBinLhs === `burn`;
  if (tmpIfTest) {
    const tmpReturnArg = $(`burned`);
    return tmpReturnArg;
  } else {
    const tmpCallCallee = evil;
    let tmpCalleeParam = tmpPrevalAliasThis.f;
    evil(tmpCalleeParam);
    let tmpCalleeParam$1 = tmpPrevalAliasThis.x;
    $(tmpCalleeParam$1);
    return `win`;
  }
};
const obj = { x: tmpObjLitVal, f: tmpObjLitVal$1 };
const tmpMCF$1 = obj.f;
let tmpCalleeParam$3 = $dotCall(tmpMCF$1, obj, `f`);
$(tmpCalleeParam$3);
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
