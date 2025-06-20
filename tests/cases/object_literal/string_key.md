# Preval test case

# string_key.md

> Object literal > String key
>
> Make sure the string key gets properly deserialized and serialized with strings vs templates

## Input

`````js filename=intro
const x = {
    "hello, world!": $(1),
    "hey, me too!"() { return $(2); },
};
$(x, x['Hey, me too!']());
`````


## Settled


`````js filename=intro
const tmpObjLitPropVal /*:unknown*/ = $(1);
const x /*:object*/ /*truthy*/ = {
  [`hello, world!`]: tmpObjLitPropVal,
  [`hey, me too!`]() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(2);
    return tmpReturnArg;
  },
};
const tmpMCF /*:unknown*/ = x[`Hey, me too!`];
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF, x, undefined);
$(x, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitPropVal = $(1);
const x = {
  [`hello, world!`]: tmpObjLitPropVal,
  [`hey, me too!`]() {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  },
};
$(x, x[`Hey, me too!`]());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  [ "hello, world!" ]: a,
  [ "hey, me too!" ](  ) {
    debugger;
    const c = $( 2 );
    return c;
  },,
};
const d = b[ "Hey, me too!" ];
const e = $dotCall( d, b, undefined );
$( b, e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitPropKey = `hello, world!`;
const tmpObjLitPropVal = $(1);
const x = {
  [tmpObjLitPropKey]: tmpObjLitPropVal,
  [`hey, me too!`]() {
    debugger;
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  },
};
let tmpCalleeParam = x;
const tmpMCF = x[`Hey, me too!`];
let tmpCalleeParam$1 = $dotCall(tmpMCF, x, undefined);
$(tmpCalleeParam, tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
