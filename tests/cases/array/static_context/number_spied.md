# Preval test case

# number_spied.md

> Array > Static context > Number spied
>
> Calling Number on arrays trigger spies

## Input

`````js filename=intro
const spy = {
  valueOf(){ $('x') }, 
  toString(){ $('y'); },
};
$(Number([spy, spy]));
`````


## Settled


`````js filename=intro
const spy /*:object*/ /*truthy*/ = {
  valueOf() {
    debugger;
    $(`x`);
    return undefined;
  },
  toString() {
    debugger;
    $(`y`);
    return undefined;
  },
};
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [spy, spy];
const tmpCalleeParam /*:number*/ = $coerce(tmpCalleeParam$1, `number`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const spy = {
  valueOf() {
    $(`x`);
  },
  toString() {
    $(`y`);
  },
};
$(Number([spy, spy]));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  valueOf(  ) {
    debugger;
    $( "x" );
    return undefined;
  },
  toString(  ) {
    debugger;
    $( "y" );
    return undefined;
  },
};
const b = [ a, a ];
const c = $coerce( b, "number" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const spy = {
  valueOf() {
    debugger;
    $(`x`);
    return undefined;
  },
  toString() {
    debugger;
    $(`y`);
    return undefined;
  },
};
let tmpCalleeParam$1 = [spy, spy];
let tmpCalleeParam = $coerce(tmpCalleeParam$1, `number`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'y'
 - 2: 'y'
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
