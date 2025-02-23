# Preval test case

# with_context.md

> Function > Apply > With context
>
> Function apply blabla

## Input

`````js filename=intro
// Intentially craft to try and proc the dot call transform
// Show that it keeps the apply when context is used (unless/until we can eliminate that too heh)
$(function(){ $(this.x); }.apply({x: 15}, ['x']));
`````

## Pre Normal


`````js filename=intro
$(
  function () {
    const tmpPrevalAliasThis = this;
    debugger;
    $(tmpPrevalAliasThis.x);
  }.apply({ x: 15 }, [`x`]),
);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam$1 = { x: 15 };
const tmpCalleeParam$3 = [`x`];
const tmpCallObj = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$5 = tmpPrevalAliasThis.x;
  tmpCallCallee$1(tmpCalleeParam$5);
  return undefined;
};
const tmpCalleeParam = tmpCallObj.apply(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCallObj /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpCalleeParam$5 /*:unknown*/ = tmpPrevalAliasThis.x;
  $(tmpCalleeParam$5);
  return undefined;
};
const tmpCalleeParam$1 /*:object*/ = { x: 15 };
const tmpCalleeParam$3 /*:array*/ = [`x`];
const tmpCalleeParam /*:unknown*/ = tmpCallObj.apply(tmpCalleeParam$1, tmpCalleeParam$3);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = b.x;
  $( c );
  return undefined;
};
const d = { x: 15 };
const e = [ "x" ];
const f = a.apply( d, e );
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 15
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
