# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = !$(100)); $(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
if (tmpUnaryArg) {
  $(false);
} else {
  let a /*:boolean*/ = false;
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpUnaryArg$1 /*:unknown*/ = $(100);
    a = !tmpUnaryArg$1;
    if (tmpUnaryArg$1) {
      break;
    } else {
    }
  }
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(100)) {
  $(false);
} else {
  let a = false;
  while (true) {
    $(1);
    const tmpUnaryArg$1 = $(100);
    a = !tmpUnaryArg$1;
    if (tmpUnaryArg$1) {
      break;
    }
  }
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( false );
}
else {
  let b = false;
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const c = $( 100 );
    b = !c;
    if (c) {
      break;
    }
  }
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpUnaryArg = $(100);
  a = !tmpUnaryArg;
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?
- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
