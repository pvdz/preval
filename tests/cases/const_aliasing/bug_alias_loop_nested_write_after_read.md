# Preval test case

# bug_alias_loop_nested_write_after_read.md

> Const aliasing > Bug alias loop nested write after read
>
> Alias before loop, read in loop, write after read in nested block inside loop

## Input

`````js filename=intro
let x = $("val");
const a = x;
for (let i = 0; i < 2; i++) {
  $(a, x); // read before possible write
  {
    if (i === 1) x = "changed";
  }
}
// Expectation: On first iteration, $(a, x) sees a === x === "val"; on second, a === x === "val" before write, then x === "changed" after write; after loop, x === "changed", a === "val".
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, x);
$(x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
$(x, x);
$(x, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, a );
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
    const tmpIfTest$1 = i === 1;
    if (tmpIfTest$1) {
      x = `changed`;
    } else {
    }
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
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
 - 3: 'val', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
