# Preval test case

# string_keys.md

> Class > String keys
>
> Testing string/template keys

## Input

`````js filename=intro
class x {
  "very stringy"() { return $(1); }
}

$(new x()['very stringy']());
`````


## Settled


`````js filename=intro
const x /*:class*/ = class {
  [`very stringy`]() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(1);
    return tmpReturnArg;
  }
};
const tmpCallObj /*:object*/ = new x();
const tmpCallCompVal /*:unknown*/ = tmpCallObj[`very stringy`];
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpCallCompVal, tmpCallObj, undefined);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = class {
  [`very stringy`]() {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  }
};
const tmpCallObj = new x();
$(tmpCallObj[`very stringy`]());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {
[ "very stringy" ](  ) {
  debugger;
  const b = $( 1 );
  return b;
}
};
const c = new a();
const d = c[ "very stringy" ];
const e = $dotCall( d, c, undefined );
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
