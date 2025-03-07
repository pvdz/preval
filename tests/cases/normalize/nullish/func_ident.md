# Preval test case

# func_ident.md

> Normalize > Nullish > Func ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $("foo"??foo);
}
$(f());
`````

## Settled


`````js filename=intro
const tmpReturnArg /*:unknown*/ = $(`foo`);
$(tmpReturnArg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`foo`));
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $(`foo` ?? foo);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = `foo`;
  const tmpIfTest = tmpCalleeParam == null;
  if (tmpIfTest) {
    tmpCalleeParam = foo;
  } else {
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'foo'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
