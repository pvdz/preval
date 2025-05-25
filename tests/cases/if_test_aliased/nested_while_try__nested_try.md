# Preval test case

# nested_while_try__nested_try.md

> If test aliased > Nested while try  nested try
>
> Test: alias with nested try

## Input

`````js filename=intro
const c = $(true);
let a = !c;
if (c) {
  try {
    $(a);
  } catch(e) {}
}

// Expected:
// let a = !c;
// if (c) {
//   try {
//     $(false);
//   } catch(e) {}
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
if (c) {
  try {
    $(false);
  } catch (e) {}
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  try {
    $(false);
  } catch (e) {}
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  try {
    $( false );
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
  try {
    $(a);
  } catch (e) {}
} else {
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
