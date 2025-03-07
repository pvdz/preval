# Preval test case

# try_catch_if_return_else_throw.md

> Flow > Try catch throw early > Try catch if return else throw
>
> The throw may leave the binding mutated anyways

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    if ($) {
      return;
    } else {
      x = 'pass';
      throw 'too';
    }
    x = 'fail2'; // This is dead code either way
  } catch {
    throw_early
    $('caught');
  }
  $(x);
}
f();
`````

## Settled


`````js filename=intro
if ($) {
} else {
  try {
    throw `too`;
  } catch (e) {
    throw_early;
    $(`caught`);
  }
  $(`pass`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$) {
  try {
    throw `too`;
  } catch (e) {
    throw_early;
    $(`caught`);
  }
  $(`pass`);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  try {
    if ($) {
      return;
    } else {
      x = `pass`;
      throw `too`;
    }
    x = `fail2`;
  } catch (e) {
    throw_early;
    $(`caught`);
  }
  $(x);
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  try {
    if ($) {
      return undefined;
    } else {
      x = `pass`;
      throw `too`;
    }
  } catch (e) {
    throw_early;
    $(`caught`);
  }
  $(x);
  return undefined;
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {

}
else {
  try {
    throw "too";
  }
  catch (a) {
    throw_early;
    $( "caught" );
  }
  $( "pass" );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

throw_early

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
