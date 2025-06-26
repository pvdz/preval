# Preval test case

# bug_alias_loop_write_after_read_break.md

> Const aliasing > Bug alias loop write after read break
>
> Alias before loop, read in loop, break before write on first iteration

## Input

`````js filename=intro
let x = $("val");
const a = x;
for (let i = 0; i < 2; i++) {
  $(a, x); // read before possible write
  if (i === 0) break;
  x = "changed";
}
// Expectation: Only first $(a, x) is executed, a === x === "val"; after loop, x === "val", a === "val".
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
  const tmpIfTest = i < 2;
  if (tmpIfTest) {
    $(a, x);
    const tmpIfTest$1 = i === 0;
    if (tmpIfTest$1) {
      break;
    } else {
      x = `changed`;
      const tmpPostUpdArgIdent = $coerce(i, `number`);
      i = tmpPostUpdArgIdent + 1;
    }
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
