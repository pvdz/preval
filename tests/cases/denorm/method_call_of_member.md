# Preval test case

# method_call_of_member.md

> Denorm > Method call of member
>
>

## Input

`````js filename=intro
var spy = { get x(){ $('x1'); return () => { $('call') }} };
var spy2 = { get x(){ $('x2') } };
spy.x(spy2.x);
`````

## Pre Normal


`````js filename=intro
let spy = undefined;
let spy2 = undefined;
spy = {
  get x() {
    debugger;
    $(`x1`);
    return () => {
      debugger;
      $(`call`);
    };
  },
};
spy2 = {
  get x() {
    debugger;
    $(`x2`);
  },
};
spy.x(spy2.x);
`````

## Normalized


`````js filename=intro
let spy = undefined;
let spy2 = undefined;
spy = {
  get x() {
    debugger;
    $(`x1`);
    const tmpReturnArg = function () {
      debugger;
      $(`call`);
      return undefined;
    };
    return tmpReturnArg;
  },
};
spy2 = {
  get x() {
    debugger;
    $(`x2`);
    return undefined;
  },
};
const tmpCallObj = spy;
const tmpCallVal = tmpCallObj.x;
const tmpCalleeParam = spy2.x;
$dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpReturnArg /*:()=>undefined*/ = function () {
  debugger;
  $(`call`);
  return undefined;
};
const spy /*:object*/ = {
  get x() {
    debugger;
    $(`x1`);
    return tmpReturnArg;
  },
};
const tmpCallVal /*:unknown*/ = spy.x;
const spy2 /*:object*/ = {
  get x() {
    debugger;
    $(`x2`);
    return undefined;
  },
};
const tmpCalleeParam /*:unknown*/ = spy2.x;
$dotCall(tmpCallVal, spy, tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "call" );
  return undefined;
};
const b = { get x() {
  debugger;
  $( "x1" );
  return a;
} };
const c = b.x;
const d = { get x() {
  debugger;
  $( "x2" );
  return undefined;
} };
const e = d.x;
$dotCall( c, b, e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x1'
 - 2: 'x2'
 - 3: 'call'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
