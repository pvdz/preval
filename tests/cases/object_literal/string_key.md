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
const x /*:object*/ = {
  [`hello, world!`]: tmpObjLitPropVal,
  [`hey, me too!`]() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(2);
    return tmpReturnArg;
  },
};
const tmpCalleeParam$1 /*:unknown*/ = x[`Hey, me too!`]();
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
const d = b[ "Hey, me too!" ]();
$( b, d );
`````


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
