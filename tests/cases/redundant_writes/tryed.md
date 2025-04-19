# Preval test case

# tryed.md

> Redundant writes > Tryed
>
> We can observe the initial value if we try/catch the if

## Input

`````js filename=intro
let n = 1;
try {
  if ($(true)) {
    n = $('throws 2');
  } else {
    n = $('throws 3');
  }
} catch {

}
$(n);
`````


## Settled


`````js filename=intro
let n /*:unknown*/ = 1;
try {
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    n = $(`throws 2`);
  } else {
    n = $(`throws 3`);
  }
} catch (e) {}
$(n);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let n = 1;
try {
  if ($(true)) {
    n = $(`throws 2`);
  } else {
    n = $(`throws 3`);
  }
} catch (e) {}
$(n);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
try {
  const b = $( true );
  if (b) {
    a = $( "throws 2" );
  }
  else {
    a = $( "throws 3" );
  }
}
catch (c) {

}
$( a );
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'throws 2'
 - 3: 'throws 2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
