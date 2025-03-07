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

## Settled


`````js filename=intro
$(`abc`);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc`);
$(undefined);
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
  const tmpCalleeParam = tmpPrevalAliasThis.str;
  $(tmpCalleeParam);
  return undefined;
};
const obj = { encode: tmpObjLitVal, str: `abc` };
const tmpCalleeParam$1 = obj.encode();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "abc" );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'abc'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
