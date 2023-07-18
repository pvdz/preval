# Preval test case

# base.md

> Function > Apply > Base
>
> Function apply blabla

#TODO

## Input

`````js filename=intro
// Intentially craft to try and proc the dot call transform
$(function(){ $(...arguments); }.apply({}, ['x']));
`````

## Pre Normal

`````js filename=intro
$(
  function () {
    const tmpPrevalAliasArgumentsAny = arguments;
    debugger;
    $(...tmpPrevalAliasArgumentsAny);
  }.apply({}, [`x`]),
);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCallObj = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  $(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
const tmpCallVal = tmpCallObj.apply;
const tmpCalleeParam$1 = {};
const tmpCalleeParam$3 = [`x`];
const tmpCalleeParam = $dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallObj = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  $(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
tmpCallObj(`x`);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  $( ... b );
  return undefined;
},;
a( "x" );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
