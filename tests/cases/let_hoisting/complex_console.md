# Preval test case

# complex_console.md

> Let hoisting > Complex console
>
> Hoisting a let even if it has a complex rhs

## Input

`````js filename=intro
const g = $({$});
let danger = function () {
  if ($) {
    danger = null;
    return 1;
  }
};
const f = g()('ok');
let x = danger(); // End goal is to move this to be between `danger` and `f`
if ($) {
  $(f);
  x = $('do not inline me');
}
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { $: $ };
const g /*:unknown*/ = $(tmpCalleeParam);
const tmpCallComplexCallee /*:unknown*/ = g();
const f /*:unknown*/ = tmpCallComplexCallee(`ok`);
let x /*:primitive*/ /*ternaryConst*/ = 1;
if ($) {
} else {
  x = undefined;
}
if ($) {
  $(f);
  const tmpClusterSSA_x /*:unknown*/ = $(`do not inline me`);
  $(tmpClusterSSA_x);
} else {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = $({ $: $ });
const tmpCallComplexCallee = g();
const f = tmpCallComplexCallee(`ok`);
let x = 1;
if (!$) {
  x = undefined;
}
if ($) {
  $(f);
  $($(`do not inline me`));
} else {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b();
const d = c( "ok" );
let e = 1;
if ($) {

}
else {
  e = undefined;
}
if ($) {
  $( d );
  const f = $( "do not inline me" );
  $( f );
}
else {
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { $: $ };
const g = $(tmpCalleeParam);
let danger = function () {
  debugger;
  if ($) {
    danger = null;
    return 1;
  } else {
    return undefined;
  }
};
const tmpCallComplexCallee = g();
const f = tmpCallComplexCallee(`ok`);
let x = danger();
if ($) {
  $(f);
  x = $(`do not inline me`);
  $(x);
} else {
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
