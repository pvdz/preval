# Preval test case

# string_spied.md

> Array > Static context > String spied
>
> Calling String on arrays trigger spies

## Input

`````js filename=intro
const spy = {
  valueOf(){ $('x') }, 
  toString(){ $('y'); },
};
String([spy, spy]);
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
const tmpEA1 /*:array*/ /*truthy*/ = [spy, spy];
$coerce(tmpEA1, `string`);
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
String([spy, spy]);
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
$coerce( b, "string" );
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
const tmpEA1 = [spy, spy];
$coerce(tmpEA1, `string`);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'y'
 - 2: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
