# Preval test case

# complex_console2.md

> Let hoisting > Complex console2
>
> Hoisting a let even if it has a complex rhs

## Input

`````js filename=intro
let danger = function () {
  if ($) {
    danger = null;
    return 1;
  }
};
const f = $('ok');
let x = danger(); // End goal is to move this to be between `danger` and `f`
if ($) {
  $(f);
  x = $('do not inline me');
}
$(x);
`````


## Settled


`````js filename=intro
const f /*:unknown*/ = $(`ok`);
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
const f = $(`ok`);
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
const a = $( "ok" );
let b = 1;
if ($) {

}
else {
  b = undefined;
}
if ($) {
  $( a );
  const c = $( "do not inline me" );
  $( c );
}
else {
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let danger = function () {
  debugger;
  if ($) {
    danger = null;
    return 1;
  } else {
    return undefined;
  }
};
const f = $(`ok`);
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
 - 1: 'ok'
 - 2: 'ok'
 - 3: 'do not inline me'
 - 4: 'do not inline me'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
