# Preval test case

# try_hell_n.md

> Flow > Try block throw early > Try hell n
>
> Bunch of try/catch/finally cases

## Options

- globals: fail_early

## Input

`````js filename=intro
let x = 0;
function f(){
  foo: {
    try {
      fail_early
      throw 'not me';
    } finally {
      return
    }
  }
}
f();
$(x);
`````


## Settled


`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {}
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  fail_early;
} catch ($finalImplicit) {}
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  fail_early;
}
catch (a) {

}
$( 0 );
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
