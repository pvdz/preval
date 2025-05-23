# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Statement > Ternary a > Auto ident delete prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
delete ($(1), $(2), arg).y ? $(100) : $(200);
$(a, arg);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const tmpIfTest /*:boolean*/ = delete arg.y;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a, arg);
} else {
  $(200);
  $(a, arg);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const tmpIfTest = delete arg.y;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(100);
  $(a, arg);
} else {
  $(200);
  $(a, arg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = delete a.y;
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( 100 );
  $( c, a );
}
else {
  $( 200 );
  $( c, a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = arg;
const tmpIfTest = delete tmpDeleteObj.y;
if (tmpIfTest) {
  $(100);
  $(a, arg);
} else {
  $(200);
  $(a, arg);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 100
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
