# Preval test case

# else_different_loop_scope_fail.md

> If test aliased > Else different loop scope fail
>
> if innerLoop check prevents; $(true) if scopes are compatible by chance

## Input

`````js filename=intro
let c = $(false);
let a = !c;
for (let i = 0; i < 1; i++) {
  if (c) {
    // ...
  } else {
    $(a); // Expected: $(a) if innerLoop check prevents; $(true) if scopes are compatible by chance
          // Based on current logic, this should be $(true) as `a` is not modified by loop.
  }
}

// Expected (assuming current logic where `a` isn't loop-dependent):
// let c = $(false);
// let a = !c;
// for (let i = 0; i < 1; i++) {
//   if (c) {
//     // ...
//   } else {
//     $(true);
//   }
// }

// Stricter interpretation (if `innerLoop` check was more about ANY loop difference):
// // Expected: $(a)
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(false);
if (c) {
} else {
  $(true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(false)) {
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {

}
else {
  $( true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(false);
let a = !c;
let i = 0;
while (true) {
  const tmpIfTest = i < 1;
  if (tmpIfTest) {
    if (c) {
    } else {
      $(a);
    }
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
`````


## Todos triggered


- (todo) do we want to support UnaryExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
