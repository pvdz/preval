# Preval test case

# booly.md

> Tofix > booly
>
> Assignment that cannot be observed should be dropped

- We probably shouldn't just drop assignments to const without an error...
- 
- The final $(x) should be hoisted inside the if/else
- Preval should know the value of x inside each branch
- The consequent call should end up as $(true)
- The alternate call should end up as $(false);

## Input

`````js filename=intro
const a = $(67636)
let x = a !== 67636;
if (x) {
  a = 10;
  x = a !== 67636;
} else {
  $(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(67636) !== 67636;
if (x) {
  x = true;
} else {
  $(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````

## Pre Normal


`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
  a = 10;
  x = a !== 67636;
} else {
  $(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````

## Normalized


`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
  a = 10;
  x = a !== 67636;
} else {
  $(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(67636);
let x /*:boolean*/ = a !== 67636;
if (x) {
  x = true;
} else {
  $(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 67636 );
let b = a !== 67636;
if (b) {
  b = true;
}
else {
  $( "Preval: Cannot write to const binding `a`" );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 67636
 - 2: 'Preval: Cannot write to const binding `a`'
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
