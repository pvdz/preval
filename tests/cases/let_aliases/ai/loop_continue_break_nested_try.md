# Preval test case

# loop_continue_break_nested_try.md

> Let aliases > Ai > Loop continue break nested try
>
> Mutation in a loop with continue, break, and nested try (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
for (let i = 0; i < 3; i++) {
  if (i === 0) continue;
  try {
    if (i === 1) {
      x = "changed";
      break;
    }
  } catch (e) {}
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
let i = 0;
while (true) {
  const tmpIfTest = i < 3;
  if (tmpIfTest) {
    $continue: {
      const tmpIfTest$1 = i === 0;
      if (tmpIfTest$1) {
        break $continue;
      } else {
        try {
          const tmpIfTest$3 = i === 1;
          if (tmpIfTest$3) {
            x = `changed`;
            break;
          } else {
          }
        } catch (e) {}
      }
    }
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement
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
