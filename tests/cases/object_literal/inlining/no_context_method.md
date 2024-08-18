# Preval test case

# no_context_method.md

> Object literal > Inlining > No context method
>
> This is a generalization of a pattern found in an (obfuscated) encode decode script. Object does not escape, calls methods that use `this`.

## Input

`````js filename=intro
const obj = {
  encode: function(){ $(abc); },
};
const str = 'abc'
$(obj.encode());
`````

## Pre Normal


`````js filename=intro
const obj = {
  encode: function () {
    debugger;
    $(abc);
  },
};
const str = `abc`;
$(obj.encode());
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  $(abc);
  return undefined;
};
const obj = { encode: tmpObjLitVal };
const str = `abc`;
const tmpCallCallee = $;
const tmpCalleeParam = obj.encode();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(abc);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( abc );
$( undefined );
`````

## Globals

BAD@! Found 1 implicit global bindings:

abc

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
