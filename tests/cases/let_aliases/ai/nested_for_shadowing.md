# Preval test case

# nested_for_shadowing.md

> Let aliases > Ai > Nested for shadowing
>
> Assignment to a variable with the same name as let, but in a for loop (should alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
for (let x = 0; x < 1; x++) {}
const b = x;
$(a, b);
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
let x$1 = 0;
while (true) {
  const tmpIfTest = x$1 < 1;
  if (tmpIfTest) {
    const tmpPostUpdArgIdent = $coerce(x$1, `number`);
    x$1 = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
const b = x;
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
