# Preval test case

# bug_alias_loop_write_after_read.md

> Const aliasing > Bug alias loop write after read
>
> Alias before loop, read in loop, write after read in same loop

## Input

`````js filename=intro
let x = $("val");
const a = x;
for (let i = 0; i < 1; i++) {
  $(a, x); // read before write
  x = "changed";
}
// Expectation: first $(a, x) sees a === x === "val"; after loop, x === "changed", a === "val".
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
let i = 0;
while (true) {
  const tmpIfTest = i < 1;
  if (tmpIfTest) {
    $(a, x);
    x = `changed`;
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested


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
