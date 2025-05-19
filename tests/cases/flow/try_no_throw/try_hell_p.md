# Preval test case

# try_hell_p.md

> Flow > Try no throw > Try hell p
>
> Bunch of try/catch/finally cases

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    throw 'one';
  } catch {
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
} catch (e) {}
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  throw `one`;
} catch (e) {}
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  throw "one";
}
catch (a) {

}
$( 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
