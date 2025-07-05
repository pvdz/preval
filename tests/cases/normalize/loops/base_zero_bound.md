# Preval test case

# base_zero_bound.md

> Normalize > Loops > Base zero bound
>
> How do you do loops?

This is the simple case with a bound loop

## Input

`````js filename=intro
function f() {
  for (let i=0; i<0; ++i) $(i);
  return 100;
}
const r = f();
$(r);
`````


## Settled


`````js filename=intro
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let i = 0;
  while (true) {
    const tmpIfTest = i < 0;
    if (tmpIfTest) {
      $(i);
      const tmpPostUpdArgIdent = $coerce(i, `number`);
      i = tmpPostUpdArgIdent + 1;
    } else {
      break;
    }
  }
  return 100;
};
const r = f();
$(r);
`````


## Todos triggered


- (todo) support WhileStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
