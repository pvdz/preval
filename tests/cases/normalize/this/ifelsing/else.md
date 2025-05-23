# Preval test case

# else.md

> Normalize > This > Ifelsing > Else
>
> Test various ways in which `this` can occur

## Input

`````js filename=intro
const a = {
  foo: 10,
  f: function f() {
    if ($(0)) {
      $('fail');
    } else {
      return this.foo;
    }
  }
};
$(a.f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(`fail`);
  $(undefined);
} else {
  $(10);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $(`fail`);
  $(undefined);
} else {
  $(10);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( "fail" );
  $( undefined );
}
else {
  $( 10 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = 10;
const f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpIfTest = $(0);
  if (tmpIfTest) {
    $(`fail`);
    return undefined;
  } else {
    const tmpReturnArg = tmpPrevalAliasThis.foo;
    return tmpReturnArg;
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
 - 1: 0
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
