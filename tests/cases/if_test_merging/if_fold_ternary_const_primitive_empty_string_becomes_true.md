# Preval test case

# if_fold_ternary_const_primitive_empty_string_becomes_true.md

> If test merging > If fold ternary const primitive empty string becomes true
>
> Test `let y = "";` (falsy) where a subsequent if(x) makes y constantly true.

## Input

`````js filename=intro
function testPrimitiveEmptyString(x_param) {
  let y = ""; 
  if (x_param) {
    y = 1;     // truthy
  } else {
    y = "hello"; // truthy
  }
  if (y) {
    $('Y is truthy - GOOD!');
  } else {
    $('Y is falsy - BAD!');
  }
  return y;
}
$(testPrimitiveEmptyString(x));

/*
function testPrimitiveEmptyString(x_param) {
  let y = ""; 
  if (x_param) {
    y = 1;
  } else {
    y = "hello";
  }
  {
    $('Y is truthy - GOOD!');
  }
  return y; // y is 1 or "hello" (truthy)
}
$(testPrimitiveEmptyString(x));
*/
`````


## Settled


`````js filename=intro
x;
$(`Y is truthy - GOOD!`);
if (x) {
  $(1);
} else {
  $(`hello`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x;
$(`Y is truthy - GOOD!`);
if (x) {
  $(1);
} else {
  $(`hello`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
x;
$( "Y is truthy - GOOD!" );
if (x) {
  $( 1 );
}
else {
  $( "hello" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testPrimitiveEmptyString = function ($$0) {
  let x_param = $$0;
  debugger;
  let y = ``;
  if (x_param) {
    y = 1;
  } else {
    y = `hello`;
  }
  if (y) {
    $(`Y is truthy - GOOD!`);
    return y;
  } else {
    $(`Y is falsy - BAD!`);
    return y;
  }
};
let tmpCalleeParam = testPrimitiveEmptyString(x);
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
