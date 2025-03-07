# Preval test case

# try_no_catch_no.md

> Ref tracking > Last write analysis > Try no catch no
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Input

`````js filename=intro
let x = $('a');
$(x);
// Can SSA this because the try does not write to it
x = $('b');
try {
  $('123');
} catch {
  $('fail');
}
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
$(x);
const tmpClusterSSA_x /*:unknown*/ = $(`b`);
try {
  $(`123`);
} catch (e) {
  $(`fail`);
}
$(tmpClusterSSA_x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`));
const tmpClusterSSA_x = $(`b`);
try {
  $(`123`);
} catch (e) {
  $(`fail`);
}
$(tmpClusterSSA_x);
`````

## Pre Normal


`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
try {
  $(`123`);
} catch (e) {
  $(`fail`);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
try {
  $(`123`);
} catch (e) {
  $(`fail`);
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
const b = $( "b" );
try {
  $( "123" );
}
catch (c) {
  $( "fail" );
}
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: '123'
 - 5: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
