# Preval test case

# bug_alias_loop_if_else_write_after_read.md

> Const aliasing > Bug alias loop if else write after read
>
> Alias before loop, read in loop, if-else in loop, write after read in each branch

## Input

`````js filename=intro
let x = $("val");
const a = x;
for (let i = 0; i < 2; i++) {
  if (i === 0) {
    $(a, x); // read before write
    x = "changed1";
  } else {
    $(a, x); // read before write
    x = "changed2";
  }
}
// Expectation: On first iteration, $(a, x) sees a === x === "val" before write, then x === "changed1" after write; on second, $(a, x) sees a === x === "changed1" before write, then x === "changed2" after write; after loop, a === "val", x === "changed2".
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, x);
$(x, `changed1`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
$(x, x);
$(x, `changed1`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, a );
$( a, "changed1" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
let i = 0;
while (true) {
  const tmpIfTest = i < 2;
  if (tmpIfTest) {
    const tmpIfTest$1 = i === 0;
    if (tmpIfTest$1) {
      $(a, x);
      x = `changed1`;
    } else {
      $(a, x);
      x = `changed2`;
    }
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
 - 3: 'val', 'changed1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
