# Preval test case

# alt_path_bug.md

> Const aliasing > Alt path bug
>
> This was bugged. Some transform order was at play too because even
> at the time of writing the normalized code would work fine. But that's
> besides the point. When we run the test case currently the bug is
> fully exposed so we were able to leverage that to fix it.

## Input

`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
if (true) {
  x = `changed`;
  $(a, x);
} else {
  $(a, x);
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, `changed`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`), `changed`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, "changed" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
x = `changed`;
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
