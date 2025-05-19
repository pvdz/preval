# Preval test case

# try_hell_g.md

> Flow > Try block throw early > Try hell g
>
> Bunch of try/catch/finally cases

## Options

- globals: fail_early

## Input

`````js filename=intro
let x = 0;
try {
  fail_early
} catch {

} finally {
  x = 1
}
$(x);
`````


## Settled


`````js filename=intro
try {
  fail_early;
} catch (e) {}
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  fail_early;
} catch (e) {}
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  fail_early;
}
catch (a) {

}
$( 1 );
`````


## Todos triggered


None


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
