# Preval test case

# bug_alias_try_catch_conditional_write.md

> Const aliasing > Bug alias try catch conditional write
>
> Alias before try/catch, read in try, conditional write in catch

## Input

`````js filename=intro
let x = $("val");
const a = x;
try {
  $(a, x); // read before possible write
  throw 1;
} catch (e) {
  if (e === 1) {
    x = "changed";
  }
}
// Expectation: $(a, x) sees a === x === "val"; after catch, x may be "changed", a === "val".
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
try {
  $(x, x);
  throw 1;
} catch (e) {}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
try {
  $(x, x);
  throw 1;
} catch (e) {}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
try {
  $( a, a );
  throw 1;
}
catch (b) {

}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
try {
  $(a, x);
  throw 1;
} catch (e) {
  const tmpIfTest = e === 1;
  if (tmpIfTest) {
    x = `changed`;
  } else {
  }
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
