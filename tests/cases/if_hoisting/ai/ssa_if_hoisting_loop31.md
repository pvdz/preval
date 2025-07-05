# Preval test case

# ssa_if_hoisting_loop31.md

> If hoisting > Ai > Ssa if hoisting loop31
>
> Test if_hoisting and SSA infinite loop: identical vars with multiple statements after

## Input

`````js filename=intro
const multi = $("multi");
if (multi) {
  let var1 = 100;
  $(var1);
  let after1 = 200;
  $(after1);
  let more1 = 300;
  $(more1);
} else {
  let var2 = 100;
  $(var2);
  let after2 = 200;
  $(after2);
  let more2 = 300;
  $(more2);
}
`````


## Settled


`````js filename=intro
$(`multi`);
$(100);
$(200);
$(300);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`multi`);
$(100);
$(200);
$(300);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "multi" );
$( 100 );
$( 200 );
$( 300 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const multi = $(`multi`);
if (multi) {
  let var1 = 100;
  $(var1);
  let after1 = 200;
  $(after1);
  let more1 = 300;
  $(more1);
} else {
  let var2 = 100;
  $(var2);
  let after2 = 200;
  $(after2);
  let more2 = 300;
  $(more2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'multi'
 - 2: 100
 - 3: 200
 - 4: 300
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
