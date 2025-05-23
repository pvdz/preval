# Preval test case

# try_return.md

> Try > Try return
>
>

## Input

`````js filename=intro
function f() {
  try {
    return NaN;
  } catch {
    $('unreachable');
  }
  $('also unreachable');
}
$('end', f);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return NaN;
};
$(`end`, f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`end`, function () {
  return NaN;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return NaN;
};
$( "end", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  return NaN;
};
$(`end`, f);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'end', '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
