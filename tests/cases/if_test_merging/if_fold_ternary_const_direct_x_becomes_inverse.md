# Preval test case

# if_fold_ternary_const_direct_x_becomes_inverse.md

> If test merging > If fold ternary const direct x becomes inverse
>
> Test `let y = x;` where `y` effectively becomes `!x`.

## Input

`````js filename=intro
const x = $(true);
function test(x) {
  let y = x;
  if (x) {
    y = false;
  } else {
    y = true;
  }

  if (y) {
    $('Y is true, so !x');
  } else {
    $('Y is false, so x');
  }
  return y;
}
$(test(x));

/*
function test(x) {
  let y = x;
  if (x) {
    y = false;
  } else {
    y = true;
  }

  if (!x) {
    $('Y is true, so !x');
  } else {
    $('Y is false, so x');
  }
  return y;
}
$(test(x));
*/
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(`Y is false, so x`);
  $(false);
} else {
  $(`Y is true, so !x`);
  $(true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`Y is false, so x`);
  $(false);
} else {
  $(`Y is true, so !x`);
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "Y is false, so x" );
  $( false );
}
else {
  $( "Y is true, so !x" );
  $( true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let test = function ($$0) {
  let x$1 = $$0;
  debugger;
  let y = x$1;
  if (x$1) {
    y = false;
  } else {
    y = true;
  }
  if (y) {
    $(`Y is true, so !x`);
    return y;
  } else {
    $(`Y is false, so x`);
    return y;
  }
};
const x = $(true);
let tmpCalleeParam = test(x);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'Y is false, so x'
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
