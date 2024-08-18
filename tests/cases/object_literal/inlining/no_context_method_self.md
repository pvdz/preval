# Preval test case

# no_context_method_self.md

> Object literal > Inlining > No context method self
>
> This is a generalization of a pattern found in an (obfuscated) encode decode script. Object does not escape, calls methods that use `this`.

## Input

`````js filename=intro
const obj = {
  encode: function(){ $('method:', obj.str); },
  str: 'abc',
};
$('objstr:', obj.str);
$('objencode:', obj.encode());
`````

## Pre Normal


`````js filename=intro
const obj = {
  encode: function () {
    debugger;
    $(`method:`, obj.str);
  },
  str: `abc`,
};
$(`objstr:`, obj.str);
$(`objencode:`, obj.encode());
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = `method:`;
  const tmpCalleeParam$1 = obj.str;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  return undefined;
};
const obj = { encode: tmpObjLitVal, str: `abc` };
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = `objstr:`;
const tmpCalleeParam$5 = obj.str;
tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
const tmpCallCallee$3 = $;
const tmpCalleeParam$7 = `objencode:`;
const tmpCalleeParam$9 = obj.encode();
tmpCallCallee$3(tmpCalleeParam$7, tmpCalleeParam$9);
`````

## Output


`````js filename=intro
$(`objstr:`, `abc`);
$(`method:`, `abc`);
$(`objencode:`, undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( "objstr:", "abc" );
$( "method:", "abc" );
$( "objencode:", undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'objstr:', 'abc'
 - 2: 'method:', 'abc'
 - 3: 'objencode:', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
