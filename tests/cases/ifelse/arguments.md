# Preval test case

# arguments.md

> Ifelse > Arguments
>
> Return this

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      return arguments;
    }
  }
}
const obj = {f, foo: 10};
$(obj.f());
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpIfTest /*:unknown*/ = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 /*:unknown*/ = $(2);
    if (tmpIfTest$1) {
      return tmpPrevalAliasArgumentsAny;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
const tmpCalleeParam /*:unknown*/ = f();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  if ($(1)) {
    if ($(2)) {
      return tmpPrevalAliasArgumentsAny;
    }
  }
};
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = $( 1 );
  if (d) {
    const e = $( 2 );
    if (e) {
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
const f = a();
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      return tmpPrevalAliasArgumentsAny;
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


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
