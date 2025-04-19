# Preval test case

# method_param_default.md

> Normalize > Class > Method param default
>
> Class with method default should be transformed properly

## Input

`````js filename=intro
class x {
  y(arg = $(10, 'default')) {
    return arg;
  }
}

$(new x().y());
`````


## Settled


`````js filename=intro
const x /*:class*/ = class {
  y($$0) {
    const tmpParamBare /*:unknown*/ = $$0;
    debugger;
    const tmpIfTest /*:boolean*/ = tmpParamBare === undefined;
    if (tmpIfTest) {
      const tmpClusterSSA_arg /*:unknown*/ = $(10, `default`);
      return tmpClusterSSA_arg;
    } else {
      return tmpParamBare;
    }
  }
};
const tmpCallObj /*:object*/ = new x();
const tmpCallCompVal /*:unknown*/ = tmpCallObj.y;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpCallCompVal, tmpCallObj, `y`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = class {
  y(tmpParamBare) {
    if (tmpParamBare === undefined) {
      const tmpClusterSSA_arg = $(10, `default`);
      return tmpClusterSSA_arg;
    } else {
      return tmpParamBare;
    }
  }
};
const tmpCallObj = new x();
$(tmpCallObj.y());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {
y( $$0 ) {
  const b = $$0;
  debugger;
  const c = b === undefined;
  if (c) {
    const d = $( 10, "default" );
    return d;
  }
  else {
    return b;
  }
}
};
const e = new a();
const f = e.y;
const g = $dotCall( f, e, "y" );
$( g );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, 'default'
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
