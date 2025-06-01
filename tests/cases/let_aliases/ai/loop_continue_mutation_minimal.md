# Preval test case

# loop_continue_mutation_minimal.md

> Let aliases > Ai > Loop continue mutation minimal
>
>

## Input

`````js filename=intro
let x = $("val");
const a = x;
let i = 0;
while (true) {
  const cond = i < 2;
  if (cond) {
    $continue: {
      const skip = i === 0;
      if (skip) {
        break $continue;
      } else {
        x = "changed";
        break;
      }
    }
    i = i + 1;
  } else {
    break;
  }
}
$(a, x);
// Expectation: a should remain "val", x should become "changed". Aliasing is NOT safe here due to mutation after possible continue.
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
  const cond = i < 2;
  if (cond) {
    $continue: {
      const skip = i === 0;
      if (skip) {
        break $continue;
      } else {
        x = `changed`;
        break;
      }
    }
    i = i + 1;
  } else {
    break;
  }
}
$(a, x);
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


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
