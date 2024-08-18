# Preval test case

# context_method.md

> Object literal > Inlining > Context method
>
> This is a generalization of a pattern found in an (obfuscated) encode decode script. Object does not escape, calls methods that use `this`.

## Input

`````js filename=intro
const obj = {
  encode: function(){ $(this.str); },
  str: 'abc',
};
$(obj.encode());
`````

## Pre Normal


`````js filename=intro
const obj = {
  encode: function () {
    const tmpPrevalAliasThis = this;
    debugger;
    $(tmpPrevalAliasThis.str);
  },
  str: `abc`,
};
$(obj.encode());
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = tmpPrevalAliasThis.str;
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
const obj = { encode: tmpObjLitVal, str: `abc` };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = obj.encode();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$(`abc`);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( "abc" );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'abc'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
