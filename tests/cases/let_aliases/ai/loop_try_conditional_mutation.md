# Preval test case

# loop_try_conditional_mutation.md

> Let aliases > Ai > Loop try conditional mutation
>
> Loop with conditional mutation and try/catch between aliases (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
try {
  for (let i = 0; i < 2; i++) {
    if (i === 1) {
      x = "changed";
      break;
    }
  }
} catch (e) {
  // do nothing
}
const b = x;
$(a, b);
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
try {
  let i = 0;
  while (true) {
    const tmpIfTest = i < 2;
    if (tmpIfTest) {
      const tmpIfTest$1 = i === 1;
      if (tmpIfTest$1) {
        x = `changed`;
        break;
      } else {
        const tmpPostUpdArgIdent = $coerce(i, `number`);
        i = tmpPostUpdArgIdent + 1;
      }
    } else {
      break;
    }
  }
} catch (e) {}
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal
- (todo) can try-escaping support this expr node type? TemplateLiteral


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
