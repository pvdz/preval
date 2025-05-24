# Preval test case

# nested_try_else__assignment_before_try.md

> If test aliased > Nested try else  assignment before try
>
> Test: alias with assignment before try (should not fire)

## Input

`````js filename=intro
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
if (!c) {
  try {
    $(1);
  } catch (e) {}
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (c) {

}
else {
  try {
    $( 1 );
  }
  catch (a) {

  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
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


BAD@! Found 1 implicit global bindings:

c


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
