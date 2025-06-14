# Preval test case

# closure_inaccessible2.md

> Bool trampoline > Closure inaccessible2
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
> In this case the closure x is inaccessible to the caller scope

## Input

`````js filename=intro
const obj = {
  f: () => {
    let x;
    const f = function() {
      x = $(100);
      const y = Boolean(x);
      return y;
    }
    $(x);
    return f;
  },
  g() {
    if (this.f()) $('pass');
    else $('fail');
  }
};
const f = obj.f();

// Prevent simple inlining
$(obj);

`````


## Settled


`````js filename=intro
const f$1 /*:()=>boolean*/ = function () {
  debugger;
  const tmpClusterSSA_tmpssa3_x /*:unknown*/ = $(100);
  const y /*:boolean*/ = $boolean_constructor(tmpClusterSSA_tmpssa3_x);
  return y;
};
const tmpObjLitVal /*:()=>function*/ = function () {
  debugger;
  $(undefined);
  return f$1;
};
$(undefined);
const obj /*:object*/ /*truthy*/ = {
  f: tmpObjLitVal,
  g() {
    const tmpPrevalAliasThis /*:object*/ /*truthy*/ = this;
    debugger;
    const tmpMCF /*:unknown*/ = tmpPrevalAliasThis.f;
    const tmpIfTest /*:unknown*/ = $dotCall(tmpMCF, tmpPrevalAliasThis, `f`);
    if (tmpIfTest) {
      $(`pass`);
      return undefined;
    } else {
      $(`fail`);
      return undefined;
    }
  },
};
$(obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f$1 = function () {
  const y = $boolean_constructor($(100));
  return y;
};
const tmpObjLitVal = function () {
  $(undefined);
  return f$1;
};
$(undefined);
$({
  f: tmpObjLitVal,
  g() {
    const tmpPrevalAliasThis = this;
    if (tmpPrevalAliasThis.f()) {
      $(`pass`);
    } else {
      $(`fail`);
    }
  },
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 100 );
  const c = $boolean_constructor( b );
  return c;
};
const d = function() {
  debugger;
  $( undefined );
  return a;
};
$( undefined );
const e = {
  f: d,
  g(  ) {
    const f = this;
    debugger;
    const g = f.f;
    const h = $dotCall( g, f, "f" );
    if (h) {
      $( "pass" );
      return undefined;
    }
    else {
      $( "fail" );
      return undefined;
    }
  },
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  let x = undefined;
  const f$1 = function () {
    debugger;
    x = $(100);
    const y = $boolean_constructor(x);
    return y;
  };
  $(x);
  return f$1;
};
const obj = {
  f: tmpObjLitVal,
  g() {
    const tmpPrevalAliasThis = this;
    debugger;
    const tmpMCF = tmpPrevalAliasThis.f;
    const tmpIfTest = $dotCall(tmpMCF, tmpPrevalAliasThis, `f`);
    if (tmpIfTest) {
      $(`pass`);
      return undefined;
    } else {
      $(`fail`);
      return undefined;
    }
  },
};
const tmpMCF$1 = obj.f;
const f = $dotCall(tmpMCF$1, obj, `f`);
$(obj);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: { f: '"<function>"', g: '"<function>"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
