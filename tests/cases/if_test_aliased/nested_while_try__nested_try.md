# Preval test case

# nested_while_try__nested_try.md

> If test aliased > Nested while try  nested try
>
> Test: alias with nested try

## Input

`````js filename=intro
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
const a /*:boolean*/ = !c;
if (c) {
  try {
    $(a);
  } catch (e) {}
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = !c;
if (c) {
  try {
    $(a);
  } catch (e) {}
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = !c;
if (c) {
  try {
    $( a );
  }
  catch (b) {

  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
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


BAD@! Found 1 implicit global bindings:

c


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
