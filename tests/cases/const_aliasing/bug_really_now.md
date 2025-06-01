# Preval test case

# bug_really_now.md

> Const aliasing > Bug really now
>
> Almost there. But AI fails again.

## Input

`````js filename=intro
let x = $("val");
const a = x;
let i = 0;
while (i < 1) {
  $continue: {
    if (i === 0) {
      x = "changed";
      break;
    }
  }
  i = i + 1;
}
$(a, x);
// Expectation: a === "val", x === "changed"
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
let i = 0;
while (true) {
  const tmpIfTest = i < 1;
  if (tmpIfTest) {
    const tmpIfTest$1 = i === 0;
    if (tmpIfTest$1) {
      x = `changed`;
      break;
    } else {
      i = i + 1;
    }
  } else {
    break;
  }
}
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
