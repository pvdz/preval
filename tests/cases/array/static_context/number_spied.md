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
const spy /*:object*/ = {
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
const tmpStringFirstArg /*:array*/ = [spy, spy];
const tmpCalleeParam /*:number*/ = $coerce(tmpStringFirstArg, `number`);
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
$($coerce([spy, spy], `number`));
`````

## Pre Normal


`````js filename=intro
const spy = {
  valueOf() {
    debugger;
    $(`x`);
  },
  toString() {
    debugger;
    $(`y`);
  },
};
$(Number([spy, spy]));
`````

## Normalized


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
const tmpStringFirstArg = [spy, spy];
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
$(tmpCalleeParam);
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
