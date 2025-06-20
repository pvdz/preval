# Preval test case

# double_if_test.md

> Tofix > double if test
>
> Hoisting a let even if it has a complex rhs

The output had a double if($){}else{} if($){}else{} at the time of writing
This is a regression but a minor one

## Input

`````js filename=intro
let danger = function () {
  if ($) {
    danger = null;
    return 1;
  }
};
const f = console.log('ok');
let x = danger(); // End goal is to move this to be between `danger` and `f`
if ($) {
  $(f);
  x = $('do not inline me');
}
$(x);
`````


## Settled


`````js filename=intro
const f /*:unknown*/ = $dotCall($console_log, console, `log`, `ok`);
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
const f = $dotCall($console_log, console, `log`, `ok`);
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
const a = $dotCall( $console_log, console, "log", "ok" );
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
const tmpMCF = $console_log;
const f = $dotCall($console_log, console, `log`, `ok`);
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
 - 1: undefined
 - 2: 'do not inline me'
 - 3: 'do not inline me'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD!?
 - !1: 'called $console_log:', 'ok'
 - !2: undefined
 -  3: 'do not inline me'
 - !4: 'do not inline me'
 - !eval returned: undefined

Post settled calls: BAD!!
 - !1: 'called $console_log:', 'ok'
 - !2: undefined
 -  3: 'do not inline me'
 - !4: 'do not inline me'
 - !eval returned: undefined

Denormalized calls: BAD!!
 - !1: 'called $console_log:', 'ok'
 - !2: undefined
 -  3: 'do not inline me'
 - !4: 'do not inline me'
 - !eval returned: undefined
