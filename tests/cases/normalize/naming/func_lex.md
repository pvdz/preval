# Preval test case

# func_lex.md

> Normalize > Naming > Func lex
>
> First an outer binding shadowed by block binding in a function

## Input

`````js filename=intro
function f() {
  let a = $(1);
  $(a);
  {
    let a = $(1);
    $(a);
    if ($()) return a; 
  }
  return a;
}
$(f());
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
$(a);
const a$1 /*:unknown*/ = $(1);
$(a$1);
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(a$1);
} else {
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
$(a);
const a$1 = $(1);
$(a$1);
if ($()) {
  $(a$1);
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = $(1);
  $(a);
  {
    let a$1 = $(1);
    $(a$1);
    if ($()) return a$1;
  }
  return a;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = $(1);
  $(a);
  let a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a$1;
  } else {
    return a;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
const b = $( 1 );
$( b );
const c = $();
if (c) {
  $( b );
}
else {
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
