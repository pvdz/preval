# Preval test case

# base_break_always.md

> Normalize > Loops > Base break always
>
> A loop with an unconditional early break

## Input

`````js filename=intro
function f() {
  let n = 0;
  while (true) {
    $(++n);
    break;
  }
  $('afterwards');
  return 100;
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(`afterwards`);
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(`afterwards`);
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( "afterwards" );
$( 100 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let n = 0;
  const tmpPostUpdArgIdent = $coerce(n, `number`);
  n = tmpPostUpdArgIdent + 1;
  let tmpCalleeParam = n;
  $(n);
  $(`afterwards`);
  return 100;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'afterwards'
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
