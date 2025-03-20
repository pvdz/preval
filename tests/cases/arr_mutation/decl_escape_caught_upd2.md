# Preval test case

# decl_escape_caught_upd2.md

> Arr mutation > Decl escape caught upd2
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
function f(a) {
  a[0] = 2;
}
const arr = 1;
f(arr);
arr[0] = 1;
arr[0] = 'x';
$(arr);
`````


## Settled


`````js filename=intro
(1)[0] = 2;
(1)[0] = 1;
(1)[0] = `x`;
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(1)[0] = 2;
(1)[0] = 1;
(1)[0] = `x`;
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
1[0] = 2;
1[0] = 1;
1[0] = "x";
$( 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Cannot create property '0' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
