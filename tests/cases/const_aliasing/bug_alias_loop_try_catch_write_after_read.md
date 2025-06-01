# Preval test case

# bug_alias_loop_try_catch_write_after_read.md

> Const aliasing > Bug alias loop try catch write after read
>
> Alias before loop, read in loop, try/catch inside loop, write in catch after read

## Input

`````js filename=intro
let x = $("val");
const a = x;
for (let i = 0; i < 2; i++) {
  try {
    $(a, x); // read before possible write
    if (i === 1) throw 1;
  } catch (e) {
    x = "changed";
  }
}
// Expectation: On first iteration, $(a, x) sees a === x === "val"; on second, $(a, x) sees a === x === "val" before write, then x === "changed" after catch; after loop, x === "changed", a === "val".
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
try {
  $(x, x);
} catch (e) {
  x = `changed`;
}
try {
  $(a, x);
  throw 1;
} catch (e$1) {}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
try {
  $(x, x);
} catch (e) {
  x = `changed`;
}
try {
  $(a, x);
  throw 1;
} catch (e$1) {}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
try {
  $( a, a );
}
catch (c) {
  a = "changed";
}
try {
  $( b, a );
  throw 1;
}
catch (d) {

}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
let i = 0;
while (true) {
  const tmpIfTest = i < 2;
  if (tmpIfTest) {
    try {
      $(a, x);
      const tmpIfTest$1 = i === 1;
      if (tmpIfTest$1) {
        throw 1;
      } else {
      }
    } catch (e) {
      x = `changed`;
    }
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'val'
 - 3: 'val', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
