# Preval test case

# ssa_if_hoisting_loop24.md

> If hoisting > Ai > Ssa if hoisting loop24
>
> Test if_hoisting and SSA infinite loop: identical var declarations with update expressions

## Input

`````js filename=intro
const counter = $("counter");
if (counter) {
  let update1 = ++counter;
  $(update1);
} else {
  let update2 = ++counter;
  $(update2);
}
`````


## Settled


`````js filename=intro
const counter /*:unknown*/ = $(`counter`);
$coerce(counter, `number`);
throw `Preval: Cannot write to const binding \`counter\``;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
Number($(`counter`));
throw `Preval: Cannot write to const binding \`counter\``;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "counter" );
$coerce( a, "number" );
throw "Preval: Cannot write to const binding `counter`";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const counter = $(`counter`);
if (counter) {
  const tmpPostUpdArgIdent = $coerce(counter, `number`);
  counter = tmpPostUpdArgIdent + 1;
  let update1 = counter;
  $(counter);
} else {
  const tmpPostUpdArgIdent$1 = $coerce(counter, `number`);
  counter = tmpPostUpdArgIdent$1 + 1;
  let update2 = counter;
  $(counter);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'counter'
 - eval returned: ('<crash[ Assignment to constant variable. ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
