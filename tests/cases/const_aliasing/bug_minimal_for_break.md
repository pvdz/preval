# Preval test case

# bug_minimal_for_break.md

> Const aliasing > Bug minimal for break
>
> For loop: break prevents mutation after aliasing

## Input

`````js filename=intro
let x = $("val");
const a = x;
for (let i = 0; i < 2; i++) {
  if (i === 0) break;
  x = "changed";
}
$(a, x);
// Expectation: a === "val", x === "val". Aliasing is safe because mutation never happens.
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
$(a, x);
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
