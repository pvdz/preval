# Preval test case

# try_hell_q.md

> Flow > Try block throw early > Try hell q
>
> Bunch of try/catch/finally cases0

## Options

- globals: fail_early

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    fail_early
    x = 1;
    throw 'one';
  } catch {
    throw 'two';
  } finally {
    break stop; // Overrides the throw in the catch
  }
}
f();
$(x);
`````


## Settled


`````js filename=intro
let x /*:number*/ = 0;
try {
  fail_early;
  x = 1;
  throw `one`;
} catch (e) {}
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
try {
  fail_early;
  x = 1;
  throw `one`;
} catch (e) {}
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
try {
  fail_early;
  a = 1;
  throw "one";
}
catch (b) {

}
$( a );
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
  try {
    fail_early;
    x = 1;
    throw `one`;
  } catch (e) {
    try {
      $finalStep = true;
      $finalArg = `two`;
      return undefined;
    } catch ($finalImplicit) {
      $implicitThrow = true;
      $finalCatchArg = $finalImplicit;
    }
  }
  return undefined;
};
let x = 0;
f();
$(x);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
