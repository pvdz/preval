# Preval test case

# this.md

> Ifelse > This
>
> Return this

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      return this;
    }
  }
}
const obj = {f, foo: 10};
$(obj.f());
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpIfTest /*:unknown*/ = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 /*:unknown*/ = $(2);
    if (tmpIfTest$1) {
      return tmpPrevalAliasThis;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
const obj /*:object*/ = { f: f, foo: 10 };
const tmpCalleeParam /*:unknown*/ = $dotCall(f, obj, `f`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  if ($(1)) {
    if ($(2)) {
      return tmpPrevalAliasThis;
    }
  }
};
$($dotCall(f, { f: f, foo: 10 }, `f`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = $( 1 );
  if (c) {
    const d = $( 2 );
    if (d) {
      return b;
    }
    else {
      return undefined;
    }
  }
  else {
    return undefined;
  }
};
const e = {
  f: a,
  foo: 10,
};
const f = $dotCall( a, e, "f" );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      return tmpPrevalAliasThis;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
const obj = { f: f, foo: 10 };
const tmpMCF = obj.f;
let tmpCalleeParam = $dotCall(tmpMCF, obj, `f`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { f: '"<function>"', foo: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
