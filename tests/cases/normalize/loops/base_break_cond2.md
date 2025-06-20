# Preval test case

# base_break_cond2.md

> Normalize > Loops > Base break cond2
>
> A loop with a conditional early break

At some point the final result was receiving undefined rather than 100 because the common return algo had a bug.

## Input

`````js filename=intro
function f() {
  let n = 0;
  while (true) {
    $(++n);
    if (n < 4) break;
  }
  $('afterwards');
  return 100;
}
$(f(), 'f');
`````


## Settled


`````js filename=intro
$(1);
$(`afterwards`);
$(100, `f`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(`afterwards`);
$(100, `f`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( "afterwards" );
$( 100, "f" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let n = 0;
  while (true) {
    const tmpPostUpdArgIdent = $coerce(n, `number`);
    n = tmpPostUpdArgIdent + 1;
    let tmpCalleeParam = n;
    $(n);
    const tmpIfTest = n < 4;
    if (tmpIfTest) {
      break;
    } else {
    }
  }
  $(`afterwards`);
  return 100;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1, `f`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'afterwards'
 - 3: 100, 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
