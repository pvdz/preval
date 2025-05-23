# Preval test case

# binary_multi_write_sibling_weaved.md

> If flipping > Binary multi write sibling weaved
>
> When the binding is used in multiple `if`s

## Input

`````js filename=intro
const a = $(1);
const b = $(2);
const c = $(3);
let y = a !== b;
if (y) {
  $('if1');
} else {
  y = a !== c;
}

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
const c /*:unknown*/ = $(3);
let y /*:boolean*/ = a === b;
if (y) {
  y = a === c;
} else {
  $(`if1`);
}
if (y) {
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
const c = $(3);
let y = a === b;
if (y) {
  y = a === c;
} else {
  $(`if1`);
}
if (y) {
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
const c = $( 3 );
let d = a === b;
if (d) {
  d = a === c;
}
else {
  $( "if1" );
}
if (d) {
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
const c = $(3);
let y = a !== b;
if (y) {
  $(`if1`);
} else {
  y = a !== c;
}
if (y) {
  $(`if2`);
} else {
  $(`else1`);
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
 - 3: 3
 - 4: 'if1'
 - 5: 'if2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
