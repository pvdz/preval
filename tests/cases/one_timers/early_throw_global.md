# Preval test case

# early_throw_global.md

> One timers > Early throw global
>
> A single call func would not be inlined in global if it had an early return. But early throw should be fine.

## Input

`````js filename=intro
// Inline me into global
function f() {
  if ($) {
    $(1);
  } else {
    throw '$ should be defined';
  }
  return $('ok');
}

$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    $(1);
  } else {
    throw `\$ should be defined`;
  }
  return $(`ok`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    $(1);
    const tmpReturnArg = $(`ok`);
    return tmpReturnArg;
  } else {
    throw `\$ should be defined`;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
if ($) {
  $(1);
  const tmpReturnArg /*:unknown*/ = $(`ok`);
  $(tmpReturnArg);
} else {
  throw `\$ should be defined`;
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 1 );
  const a = $( "ok" );
  $( a );
}
else {
  throw "$ should be defined";
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'ok'
 - 3: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
