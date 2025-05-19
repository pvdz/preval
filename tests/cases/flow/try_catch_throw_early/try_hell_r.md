# Preval test case

# try_hell_r.md

> Flow > Try catch throw early > Try hell r
>
> Bunch of try/catch/finally cases0

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
    x = 2;
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
  throw `one`;
} catch (e) {
  try {
    throw_early;
    x = 2;
  } catch ($finalImplicit) {}
}
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
try {
  throw `one`;
} catch (e) {
  try {
    throw_early;
    x = 2;
  } catch ($finalImplicit) {}
}
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
try {
  throw "one";
}
catch (b) {
  try {
    throw_early;
    a = 2;
  }
  catch (c) {

  }
}
$( a );
`````


## Todos triggered


None


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
