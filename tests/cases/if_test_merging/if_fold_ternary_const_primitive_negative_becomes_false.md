# Preval test case

# if_fold_ternary_const_primitive_negative_becomes_false.md

> If test merging > If fold ternary const primitive negative becomes false
>
> Test `let y = -1;` (truthy) where a subsequent if(x) makes y constantly false.

## Input

`````js filename=intro
function testPrimitiveNegative(x_param) {
  let y = -1; 
  if (x_param) {
    y = 0;   // falsy
  } else {
    y = "";   // falsy
  }
  if (y) {
    $('Y is truthy - BAD!');
  } else {
    $('Y is falsy - GOOD!');
  }
  return y;
}
$(testPrimitiveNegative(x));

/*
function testPrimitiveNegative(x_param) {
  let y = -1; 
  if (x_param) {
    y = 0;
  } else {
    y = "";
  }
  {
    $('Y is falsy - GOOD!');
  }
  return y; // y is 0 or "" (falsy)
}
$(testPrimitiveNegative(x));
*/
`````


## Settled


`````js filename=intro
x;
$(`Y is falsy - GOOD!`);
if (x) {
  $(0);
} else {
  $(``);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x;
$(`Y is falsy - GOOD!`);
if (x) {
  $(0);
} else {
  $(``);
}
`````


## PST Settled
With rename=true

`````js filename=intro
x;
$( "Y is falsy - GOOD!" );
if (x) {
  $( 0 );
}
else {
  $( "" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testPrimitiveNegative = function ($$0) {
  let x_param = $$0;
  debugger;
  let y = -1;
  if (x_param) {
    y = 0;
  } else {
    y = ``;
  }
  if (y) {
    $(`Y is truthy - BAD!`);
    return y;
  } else {
    $(`Y is falsy - GOOD!`);
    return y;
  }
};
let tmpCalleeParam = testPrimitiveNegative(x);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
