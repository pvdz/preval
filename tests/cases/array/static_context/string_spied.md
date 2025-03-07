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
const tmpCalleeParam /*:array*/ = [spy, spy];
$coerce(tmpCalleeParam, `string`);
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
$coerce([spy, spy], `string`);
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
String([spy, spy]);
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
const tmpCalleeParam = [spy, spy];
$coerce(tmpCalleeParam, `string`);
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
