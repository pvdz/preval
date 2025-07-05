# Preval test case

# try_hell_p.md

> Flow > Try catch throw early > Try hell p
>
> Bunch of try/catch/finally cases

## Options

- globals: throw_early

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    throw 'one';
  } catch {
    throw_early
    throw 'two';
  } finally {
    break stop; // Overrides the throw in the catch
  }
  x = 1;
}
f();
$(x);
`````


## Settled


`````js filename=intro
try {
  throw `one`;
} catch (e) {
  try {
    throw_early;
  } catch ($finalImplicit) {}
}
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  throw `one`;
} catch (e) {
  try {
    throw_early;
  } catch ($finalImplicit) {}
}
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  throw "one";
}
catch (a) {
  try {
    throw_early;
  }
  catch (b) {

  }
}
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let $implicitThrow = false;
  let $finalStep = false;
  let $finalCatchArg = undefined;
  let $finalArg = undefined;
  $finally: {
    try {
      throw `one`;
    } catch (e) {
      try {
        throw_early;
        $finalStep = true;
        $finalArg = `two`;
        break $finally;
      } catch ($finalImplicit) {
        $implicitThrow = true;
        $finalCatchArg = $finalImplicit;
      }
    }
  }
  x = 1;
  return undefined;
};
let x = 0;
f();
$(x);
`````


## Todos triggered


- (todo) support LabeledStatement as statement in let_hoisting noob check


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
