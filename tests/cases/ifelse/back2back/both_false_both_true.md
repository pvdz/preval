# Preval test case

# both_false_both_true.md

> Ifelse > Back2back > Both false both true
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(false, 'a');
if (x) {
  $(x, 'A');
  x = $(true, 'b');
} else {
  $(x, 'B');
  x = $(true, 'b');
}
if (x) {
  $(x, 'one');
} else {
  $(x, 'two');
}
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = $(false, `a`);
if (x) {
  $(x, `A`);
  x = $(true, `b`);
} else {
  $(x, `B`);
  x = $(true, `b`);
}
if (x) {
  $(x, `one`);
} else {
  $(x, `two`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(false, `a`);
if (x) {
  $(x, `A`);
  x = $(true, `b`);
} else {
  $(x, `B`);
  x = $(true, `b`);
}
if (x) {
  $(x, `one`);
} else {
  $(x, `two`);
}
`````

## Pre Normal


`````js filename=intro
let x = $(false, `a`);
if (x) {
  $(x, `A`);
  x = $(true, `b`);
} else {
  $(x, `B`);
  x = $(true, `b`);
}
if (x) {
  $(x, `one`);
} else {
  $(x, `two`);
}
`````

## Normalized


`````js filename=intro
let x = $(false, `a`);
if (x) {
  $(x, `A`);
  x = $(true, `b`);
} else {
  $(x, `B`);
  x = $(true, `b`);
}
if (x) {
  $(x, `one`);
} else {
  $(x, `two`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = $( false, "a" );
if (a) {
  $( a, "A" );
  a = $( true, "b" );
}
else {
  $( a, "B" );
  a = $( true, "b" );
}
if (a) {
  $( a, "one" );
}
else {
  $( a, "two" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: false, 'a'
 - 2: false, 'B'
 - 3: true, 'b'
 - 4: true, 'one'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
