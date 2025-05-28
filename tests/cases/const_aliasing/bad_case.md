# Preval test case

# bad_case.md

> Const aliasing > Bad case
>
> iunno but this broke

## Input

`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
let i /*:number*/ = 0;
while (true) {
  const tmpIfTest /*:boolean*/ = i < 2;
  if (tmpIfTest) {
    $(a, x);
    const tmpIfTest$1 /*:boolean*/ = i === 0;
    if (tmpIfTest$1) {
      x = `changed1`;
    } else {
      x = `changed2`;
    }
    i = i + 1;
  } else {
    break;
  }
}
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
    $(a, x);
    const tmpIfTest$1 = i === 0;
    if (tmpIfTest$1) {
      x = `changed1`;
    } else {
      x = `changed2`;
    }
    i = i + 1;
  } else {
    break;
  }
}
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
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
