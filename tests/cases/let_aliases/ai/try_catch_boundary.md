# Preval test case

# try_catch_boundary.md

> Let aliases > Ai > Try catch boundary
>
> Aliasing across try/catch boundary (should not alias)

## Options

- globals: a

## Input

`````js filename=intro
let x = $("val");
try {
  const a = x;
} catch (e) {}
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(a, $(`val`));
`````


## PST Settled
With rename=true

`````js filename=intro
const b = $( "val" );
$( a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
try {
  const a$1 = x;
} catch (e) {}
const b = x;
$(a, x);
`````


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: BAD!!
 - !eval returned: ('<crash[ <ref> is not defined ]>')
