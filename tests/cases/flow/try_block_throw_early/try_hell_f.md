# Preval test case

# try_hell_f.md

> Flow > Try block throw early > Try hell f
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
  x = 1
} finally {

}
$(x);
`````


## Settled


`````js filename=intro
let x /*:number*/ = 0;
try {
  fail_early;
} catch (e) {
  x = 1;
}
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
try {
  fail_early;
} catch (e) {
  x = 1;
}
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
try {
  fail_early;
}
catch (b) {
  a = 1;
}
$( a );
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


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
