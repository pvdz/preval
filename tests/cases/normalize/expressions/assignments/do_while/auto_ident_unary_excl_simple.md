# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = !arg));
$(a, arg);
`````


## Settled


`````js filename=intro
$(100);
$(false, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(false, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( false, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  a = !arg;
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, arg);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
