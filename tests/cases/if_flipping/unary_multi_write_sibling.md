# Preval test case

# unary_multi_write_sibling.md

> If flipping > Unary multi write sibling
>
> When the binding is used in multiple `if`s

## Input

`````js filename=intro
const a = $(1);
const b = $(2);
let y = !a;
if (y) { // This should become x, with the branches flipped
  $('if1');
} else {
}

// This write gets SSA'd, flipped, and then eliminated
y = !b;
if (y) {
  $('if2');
} else {
  $('else1');
}

//$(y, 'after');
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = $(2);
if (a) {
} else {
  $(`if1`);
}
if (b) {
  $(`else1`);
} else {
  $(`if2`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
const b = $(2);
if (!a) {
  $(`if1`);
}
if (b) {
  $(`else1`);
} else {
  $(`if2`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
if (a) {

}
else {
  $( "if1" );
}
if (b) {
  $( "else1" );
}
else {
  $( "if2" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(1);
const b = $(2);
let y = !a;
if (y) {
  $(`if1`);
} else {
}
y = !b;
if (y) {
  $(`if2`);
} else {
  $(`else1`);
}
`````


## Todos triggered


- (todo) support IfStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'else1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
