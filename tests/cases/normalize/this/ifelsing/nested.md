# Preval test case

# nested.md

> Normalize > This > Ifelsing > Nested
>
> Test various ways in which `this` can occur

## Input

`````js filename=intro
const a = {
  foo: 10,
  f: function f() {
    if ($(1)) {
      if ($(2)) {
        return this.foo;
      }
    }
  }
};
$(a.f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    $(10);
  } else {
    $(undefined);
  }
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  if ($(2)) {
    $(10);
  } else {
    $(undefined);
  }
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  if (b) {
    $( 10 );
  }
  else {
    $( undefined );
  }
}
else {
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = 10;
const f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      const tmpReturnArg = tmpPrevalAliasThis.foo;
      return tmpReturnArg;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
const tmpObjLitVal$1 = f;
const a = { foo: tmpObjLitVal, f: tmpObjLitVal$1 };
const tmpMCF = a.f;
let tmpCalleeParam = $dotCall(tmpMCF, a, `f`);
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
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
