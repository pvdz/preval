# Preval test case

# exitwrite_that_is_not_read.md

> Ref tracking > Done > Exitwrite that is not read
>
> An exitWrite that is not read should be eliminated.
> Pretty trivial case but.

## Input

`````js filename=intro
let x = 1;
$(1);
try {
  $(1);
  x = 2;
} catch (_) {}
$(x);
x = 3;
$(3);
`````


## Settled


`````js filename=intro
let x /*:number*/ /*truthy*/ = 1;
$(1);
try {
  $(1);
  x = 2;
} catch (_) {}
$(x);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
$(1);
try {
  $(1);
  x = 2;
} catch (_) {}
$(x);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
$( 1 );
try {
  $( 1 );
  a = 2;
}
catch (b) {

}
$( a );
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
$(1);
try {
  $(1);
  x = 2;
} catch (_) {}
$(x);
x = 3;
$(3);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
