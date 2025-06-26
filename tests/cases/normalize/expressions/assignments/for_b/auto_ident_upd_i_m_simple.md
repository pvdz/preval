# Preval test case

# auto_ident_upd_i_m_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (; (a = b--); $(1));
$(a, b);
`````


## Settled


`````js filename=intro
$(1);
$(0, -1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(0, -1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 0, -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent - 1;
  a = tmpPostUpdArgIdent;
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) do we want to support Literal as expression statement in free loops?
- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 0, -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
