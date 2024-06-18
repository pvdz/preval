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
const tmpCallCallee = [spy, spy];
$coerce(tmpCallCallee, `string`);
`````

## Output


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
const tmpCallCallee = [spy, spy];
$coerce(tmpCallCallee, `string`);
`````

## PST Output

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

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
