# Preval test case

# base_value.md

> If merging > Base value
>
> When back to back ifs test on the same constant, the ifs can be merged safely

## Input

`````js filename=intro
const y = !$spy(10);
if (y) $('a'); else $('b');
if (y) $('d'); else $('c');
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $spy(10);
if (tmpUnaryArg) {
  $(`b`);
  $(`c`);
} else {
  $(`a`);
  $(`d`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($spy(10)) {
  $(`b`);
  $(`c`);
} else {
  $(`a`);
  $(`d`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 10 );
if (a) {
  $( "b" );
  $( "c" );
}
else {
  $( "a" );
  $( "d" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [10, 10]
 - 2: 'b'
 - 3: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
