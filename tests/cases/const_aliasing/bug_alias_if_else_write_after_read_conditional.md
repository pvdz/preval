# Preval test case

# bug_alias_if_else_write_after_read_conditional.md

> Const aliasing > Bug alias if else write after read conditional
>
> Alias before if-else, read before conditional write in each branch

## Input

`````js filename=intro
let x = $("val");
const a = x;
if (true) {
  $(a, x); // read before possible write
  if (false) x = "changed1";
} else {
  $(a, x); // read before possible write
  if (false) x = "changed2";
}
// Expectation: $(a, x) in each branch sees a === x === "val"; after branch, x === "val", a === "val".
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
$(x, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
$(x, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
