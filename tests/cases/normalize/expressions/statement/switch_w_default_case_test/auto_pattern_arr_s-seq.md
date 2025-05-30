# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Statement > Switch w default case test > Auto pattern arr s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
switch ($(1)) {
  case ($(10), $(20), [1, 2]):
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const tmpSwitchValue /*:unknown*/ = $(1);
$(10);
$(20);
const tmpIfTest$1 /*:boolean*/ = 2 === tmpSwitchValue;
if (tmpIfTest$1) {
  $(`fail2`);
  $(a);
} else {
  $(`fail1`);
  $(`fail2`);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
const a = [...tmpBindingPatternArrRoot][0];
const tmpSwitchValue = $(1);
$(10);
$(20);
if (2 === tmpSwitchValue) {
  $(`fail2`);
  $(a);
} else {
  $(`fail1`);
  $(`fail2`);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ...a ];
const c = b[ 0 ];
const d = $( 1 );
$( 10 );
$( 20 );
const e = 2 === d;
if (e) {
  $( "fail2" );
  $( c );
}
else {
  $( "fail1" );
  $( "fail2" );
  $( c );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
