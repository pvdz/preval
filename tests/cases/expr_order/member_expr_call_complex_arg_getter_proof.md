# Preval test case

# member_expr_call_complex_arg_getter_proof.md

> Expr order > Member expr call complex arg getter proof
>
> Spread should normalize itself

This should throw. There was a regression where `a.b` was read before `x.y` (but the evaluation order ought to read `x.y` first)

This case proofs it with a getter.

## Input

`````js filename=intro
var a = {
  get b() {
    $('b.get');
    return 100;
  },
};
var x = {
  get y() {
    $('y.get');
    return $;
  },
};
x.y(a.b);
`````


## Settled


`````js filename=intro
const x /*:object*/ = {
  get y() {
    debugger;
    $(`y.get`);
    return $;
  },
};
const tmpCallCompVal /*:unknown*/ = x.y;
const a /*:object*/ = {
  get b() {
    debugger;
    $(`b.get`);
    return 100;
  },
};
const tmpCalleeParam /*:unknown*/ = a.b;
$dotCall(tmpCallCompVal, x, `y`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = {
  get y() {
    $(`y.get`);
    return $;
  },
};
x.y(
  {
    get b() {
      $(`b.get`);
      return 100;
    },
  }.b,
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { get y() {
  debugger;
  $( "y.get" );
  return $;
} };
const b = a.y;
const c = { get b() {
  debugger;
  $( "b.get" );
  return 100;
} };
const d = c.b;
$dotCall( b, a, "y", d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'y.get'
 - 2: 'b.get'
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
