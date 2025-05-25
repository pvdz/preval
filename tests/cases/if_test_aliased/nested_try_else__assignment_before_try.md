# Preval test case

# nested_try_else__assignment_before_try.md

> If test aliased > Nested try else  assignment before try
>
> Test: alias with assignment before try (should not fire)

## Input

`````js filename=intro
const c = $(true);
let a = !c;
a = 1;
if (c) {
} else {
  try {
    $(a);
  } catch(e) {}
}

// Expected:
// let a = !c;
// a = 1;
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
    $(1);
  } catch (e) {}
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(true)) {
  try {
    $(1);
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
    $( 1 );
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
a = 1;
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
