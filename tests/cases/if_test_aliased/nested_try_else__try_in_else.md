# Preval test case

# nested_try_else__try_in_else.md

> If test aliased > Nested try else  try in else
>
> Test: alias with try in else

## Input

`````js filename=intro
const c = $(true);
let a = !c;
if (c) {
} else {
  try {
    $(a);
  } catch(e) {}
}

// Expected:
// let a = !c;
// if (c) {
// } else {
//   try {
//     $(a);
//   } catch(e) {}
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
if (c) {
} else {
  try {
    $(true);
  } catch (e) {}
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(true)) {
  try {
    $(true);
  } catch (e) {}
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {

}
else {
  try {
    $( true );
  }
  catch (b) {

  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const c = $(true);
let a = !c;
if (c) {
} else {
  try {
    $(a);
  } catch (e) {}
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
