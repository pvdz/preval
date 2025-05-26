# Preval test case

# if_fold_ternary_const_primitive_string_becomes_false.md

> If test merging > If fold ternary const primitive string becomes false
>
> Test `let y = "foo";` (truthy) where a subsequent if(x) makes y constantly false.

## Input

`````js filename=intro
function testPrimitiveString(x_param) {
  let y = "foo"; 
  if (x_param) {
    y = 0;   // falsy
  } else {
    y = null; // falsy
  }
  if (y) {
    $('Y is truthy - BAD!');
  } else {
    $('Y is falsy - GOOD!');
  }
  return y;
}
$(testPrimitiveString(x));

/*
function testPrimitiveString(x_param) {
  let y = "foo"; 
  if (x_param) {
    y = 0; 
  } else {
    y = null;
  }
  {
    $('Y is falsy - GOOD!');
  }
  return y; // y is 0 or null (falsy)
}
$(testPrimitiveString(x));
*/
`````


## Settled


`````js filename=intro
x;
$(`Y is falsy - GOOD!`);
if (x) {
  $(0);
} else {
  $(null);
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
  $(null);
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
  $( null );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testPrimitiveString = function ($$0) {
  let x_param = $$0;
  debugger;
  let y = `foo`;
  if (x_param) {
    y = 0;
  } else {
    y = null;
  }
  if (y) {
    $(`Y is truthy - BAD!`);
    return y;
  } else {
    $(`Y is falsy - GOOD!`);
    return y;
  }
};
let tmpCalleeParam = testPrimitiveString(x);
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
