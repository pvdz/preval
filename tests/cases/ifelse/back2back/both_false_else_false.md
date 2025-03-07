# Preval test case

# both_false_else_false.md

> Ifelse > Back2back > Both false else false
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(false, 'a');
if (x) {
  $(x, 'A');
  x = $(false, 'b');
} else {
  $(x, 'B');
  x = $(false, 'b');
}
if (x) {
} else {
  $(x, 'hit');
}
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = $(false, `a`);
if (x) {
  $(x, `A`);
  x = $(false, `b`);
} else {
  $(x, `B`);
  x = $(false, `b`);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(false, `a`);
if (x) {
  $(x, `A`);
  x = $(false, `b`);
} else {
  $(x, `B`);
  x = $(false, `b`);
}
if (!x) {
  $(x, `hit`);
}
`````

## Pre Normal


`````js filename=intro
let x = $(false, `a`);
if (x) {
  $(x, `A`);
  x = $(false, `b`);
} else {
  $(x, `B`);
  x = $(false, `b`);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## Normalized


`````js filename=intro
let x = $(false, `a`);
if (x) {
  $(x, `A`);
  x = $(false, `b`);
} else {
  $(x, `B`);
  x = $(false, `b`);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = $( false, "a" );
if (a) {
  $( a, "A" );
  a = $( false, "b" );
}
else {
  $( a, "B" );
  a = $( false, "b" );
}
if (a) {

}
else {
  $( a, "hit" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false, 'a'
 - 2: false, 'B'
 - 3: false, 'b'
 - 4: false, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
