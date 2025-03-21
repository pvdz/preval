# Preval test case

# try_implicit_throw_finally.md

> Ref tracking > Tofix > Try implicit throw finally
>
> The last read can't reach 1 at all. But we can't statically determine this. So it should at least reach 2, as well.

## Input

`````js filename=intro
let x = 1;
abc: try {
  fail;
  break abc;
} catch {
  x = 2;
}
$(x);
`````


## Settled


`````js filename=intro
let x /*:number*/ = 1;
try {
  fail;
} catch (e) {
  x = 2;
}
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
try {
  fail;
} catch (e) {
  x = 2;
}
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
try {
  fail;
}
catch (b) {
  a = 2;
}
$( a );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

fail


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
