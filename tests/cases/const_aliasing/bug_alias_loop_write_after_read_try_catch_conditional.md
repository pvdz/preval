# Preval test case

# bug_alias_loop_write_after_read_try_catch_conditional.md

> Const aliasing > Bug alias loop write after read try catch conditional
>
> Alias before loop, read in loop, try/catch in loop, conditional write in catch after read

## Input

`````js filename=intro
let x = $("val");
const a = x;
for (let i = 0; i < 2; i++) {
  try {
    $(a, x); // read before possible write
    if (i === 1) throw 1;
  } catch (e) {
    if (e === 1) x = "changed";
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
  const tmpIfTest$3 /*:boolean*/ = e === 1;
  if (tmpIfTest$3) {
    x = `changed`;
  } else {
  }
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
  if (e === 1) {
    x = `changed`;
  }
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
  const d = c === 1;
  if (d) {
    a = "changed";
  }
}
try {
  $( b, a );
  throw 1;
}
catch (e) {

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
      const tmpIfTest$3 = e === 1;
      if (tmpIfTest$3) {
        x = `changed`;
      } else {
      }
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
