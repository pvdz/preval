# Preval test case

# simple_method.md

> Object literal > Inlining > Simple method
>
> This is a generalization of a pattern found in an (obfuscated) encode decode script. Object does not escape, calls methods that use `this`.

## Input

`````js filename=intro
const obj = {
  encode: function(){ $('inline me'); },
};
$(obj.encode());
`````

## Pre Normal


`````js filename=intro
const obj = {
  encode: function () {
    debugger;
    $(`inline me`);
  },
};
$(obj.encode());
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  $(`inline me`);
  return undefined;
};
const obj = { encode: tmpObjLitVal };
const tmpCalleeParam = obj.encode();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`inline me`);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( "inline me" );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'inline me'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
