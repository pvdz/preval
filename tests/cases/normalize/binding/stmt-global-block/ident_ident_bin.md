# Preval test case

# ident_ident_bin.md

> Normalize > Binding > Stmt-global-block > Ident ident bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
if ($(true)) {
  let b = 2, c = 3, d = 4;
  let a = b = c + d;
  $(a, b, c);
}
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(7, 7, 3);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(7, 7, 3);
}
`````

## Pre Normal


`````js filename=intro
if ($(true)) {
  let b = 2,
    c = 3,
    d = 4;
  let a = (b = c + d);
  $(a, b, c);
}
`````

## Normalized


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = 2;
  let c = 3;
  let d = 4;
  b = c + d;
  let a = b;
  $(a, b, c);
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 7, 7, 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 7, 7, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
