# Preval test case

# base_implicit.md

> If test merging > Base implicit
>
> When back to back ifs test on the same constant, the ifs can be merged safely

## Input

`````js filename=intro
const x = !unknown;
if (x) $('a'); else $('b');
if (x) $('d'); else $('c');
`````


## Settled


`````js filename=intro
if (unknown) {
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
if (unknown) {
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
if (unknown) {
  $( "b" );
  $( "c" );
}
else {
  $( "a" );
  $( "d" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = !unknown;
if (x) {
  $(`a`);
} else {
  $(`b`);
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````


## Todos triggered


- (todo) when is a constant an implicit global too?


## Globals


BAD@! Found 1 implicit global bindings:

unknown


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
