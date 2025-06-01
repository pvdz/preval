# Preval test case

# bug_alias_if_else_try_catch_write_after_read.md

> Const aliasing > Bug alias if else try catch write after read
>
> Alias before if-else, read in each branch, try/catch in one branch, write in catch after read

## Input

`````js filename=intro
let x = $("val");
const a = x;
if (true) {
  try {
    $(a, x); // read before possible write
    throw 1;
  } catch (e) {
    x = "changed1";
  }
} else {
  $(a, x);
  x = "changed2";
}
// Expectation: In true branch, $(a, x) sees a === x === "val" before write, then x === "changed1" after catch; in false branch, $(a, x) sees a === x === "val" before write, then x === "changed2" after write; after if-else, a === "val", x === "changed1" or "changed2".
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
  x = `changed1`;
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
