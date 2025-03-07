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
let tmpCalleeParam /*:primitive*/ = undefined;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    tmpCalleeParam = 10;
  } else {
  }
} else {
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
if ($(1)) {
  if ($(2)) {
    tmpCalleeParam = 10;
  }
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
const a = {
  foo: 10,
  f: function f() {
    const tmpPrevalAliasThis = this;
    debugger;
    if ($(1)) {
      if ($(2)) {
        return tmpPrevalAliasThis.foo;
      }
    }
  },
};
$(a.f());
`````

## Normalized


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
const tmpCalleeParam = a.f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  const c = $( 2 );
  if (c) {
    a = 10;
  }
}
$( a );
`````

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
