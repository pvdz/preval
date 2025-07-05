# Preval test case

# func_param_propagation3.md

> Tofix > func param propagation3
>
> If we can resolve that `===` at call time and pass in a boolean for it ... then we can eliminate this whole function

## Input

`````js filename=intro
const f = function ($$0) {
  const $dlr_$$0 = $$0;
  debugger;
  const tmpIfTest$1 = $dlr_$$0 === undefined;
  if (tmpIfTest$1) {
    const c = [`x`, `bar`];
    return c;
  } else {
    const d = [`x`, $dlr_$$0];
    return d;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(`y`);
$(tmpCalleeParam$1);
`````


## Settled


`````js filename=intro
const c /*:array*/ /*truthy*/ = [`x`, `bar`];
$(c);
const d /*:array*/ /*truthy*/ = [`x`, `y`];
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`x`, `bar`]);
$([`x`, `y`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "x", "bar" ];
$( a );
const b = [ "x", "y" ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const $dlr_$$1 = $dlr_$$0;
  const tmpIfTest$1 = $dlr_$$1 === undefined;
  if (tmpIfTest$1) {
    const c = [`x`, `bar`];
    return c;
  } else {
    const d = [`x`, $dlr_$$1];
    return d;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(`y`);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['x', 'bar']
 - 2: ['x', 'y']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
