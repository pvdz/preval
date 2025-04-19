# Preval test case

# class_computed_key.md

> Normalize > Class > Class computed key
>
> The computed key of a class should be evaluated outside of the class body, before the class.

## Input

`````js filename=intro
class x {
  [$('f')](){
    return $(100);
  }
}
$(new x().f());
`````


## Settled


`````js filename=intro
const tmpClassComputedKey /*:unknown*/ = $(`f`);
const x /*:class*/ = class {
  [tmpClassComputedKey]() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(100);
    return tmpReturnArg;
  }
};
const tmpCallObj /*:object*/ = new x();
const tmpCallCompVal /*:unknown*/ = tmpCallObj.f;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpCallCompVal, tmpCallObj, `f`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClassComputedKey = $(`f`);
const x = class {
  [tmpClassComputedKey]() {
    const tmpReturnArg = $(100);
    return tmpReturnArg;
  }
};
const tmpCallObj = new x();
$(tmpCallObj.f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "f" );
const b = class   {
[ a ](  ) {
  debugger;
  const c = $( 100 );
  return c;
}
};
const d = new b();
const e = d.f;
const f = $dotCall( e, d, "f" );
$( f );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'f'
 - 2: 100
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
