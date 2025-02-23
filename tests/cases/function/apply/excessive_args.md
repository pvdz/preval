# Preval test case

# excessive_args.md

> Function > Apply > Excessive args
>
> Function apply blabla

## Input

`````js filename=intro
// Intentially craft to try and proc the dot call transform
$(function(){ $(...arguments); }.apply(({}), (['x']), 1, 2, 3));
`````

## Pre Normal


`````js filename=intro
$(
  function () {
    const tmpPrevalAliasArgumentsAny = arguments;
    debugger;
    $(...tmpPrevalAliasArgumentsAny);
  }.apply({}, [`x`], 1, 2, 3),
);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam$1 = {};
const tmpCalleeParam$3 = [`x`];
const tmpCalleeParam$5 = 1;
const tmpCalleeParam$7 = 2;
const tmpCalleeParam$9 = 3;
const tmpCallObj = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  $(...tmpPrevalAliasArgumentsAny);
  return undefined;
};
const tmpCalleeParam = tmpCallObj.apply(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7, tmpCalleeParam$9);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCallObj /*:()=>*/ = function () {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
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
  $( ...b );
  return undefined;
};
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
