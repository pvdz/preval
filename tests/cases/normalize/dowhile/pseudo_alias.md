# Preval test case

# pseudo_alias.md

> Normalize > Dowhile > Pseudo alias
>
> From react

This is the findOwnerStack function in react.

The point here is that doWhileFlag is an alias to the test value v but it is redundant as v serves the same purpose.

After that, the constant y should also be up for elimination.

## Input

`````js filename=intro
function f(v) {
  if (v) {
    let doWhileFlag = true;
    while (doWhileFlag) {
      $('loop');
      const x = v._currentElement;
      const y = x._owner;
      v = y;
      doWhileFlag = y;
    }
  }
}
$(f());
$(f());
`````

## Settled


`````js filename=intro
$(undefined);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let v = $$0;
  debugger;
  if (v) {
    let doWhileFlag = true;
    while (doWhileFlag) {
      $(`loop`);
      const x = v._currentElement;
      const y = x._owner;
      v = y;
      doWhileFlag = y;
    }
  }
};
$(f());
$(f());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let v = $$0;
  debugger;
  if (v) {
    let doWhileFlag = true;
    while (true) {
      if (doWhileFlag) {
        $(`loop`);
        const x = v._currentElement;
        const y = x._owner;
        v = y;
        doWhileFlag = y;
      } else {
        break;
      }
    }
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
