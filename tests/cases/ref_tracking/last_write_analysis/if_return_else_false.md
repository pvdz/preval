# Preval test case

# if_return_else_false.md

> Ref tracking > Last write analysis > If return else false
>
> Last write analysis should pick up on the return and assume that the prior write can not be observed later.

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1;
  if ($(false)) {
    x = $(2, 'prevent optim');
    return x;
  } else {
    x = $(3, 'prevent optim');
  }
  
  $('prevent return hoisting');
  return x;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  if ($(false)) {
    x = $(2, `prevent optim`);
    return x;
  } else {
    x = $(3, `prevent optim`);
  }
  $(`prevent return hoisting`);
  return x;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    x = $(2, `prevent optim`);
    return x;
  } else {
    x = $(3, `prevent optim`);
    $(`prevent return hoisting`);
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpIfTest = $(false);
if (tmpIfTest) {
  const tmpClusterSSA_x = $(2, `prevent optim`);
  $(tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 = $(3, `prevent optim`);
  $(`prevent return hoisting`);
  $(tmpClusterSSA_x$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  const b = $( 2, "prevent optim" );
  $( b );
}
else {
  const c = $( 3, "prevent optim" );
  $( "prevent return hoisting" );
  $( c );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: 3, 'prevent optim'
 - 3: 'prevent return hoisting'
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
