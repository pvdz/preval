# Preval test case

# dupe_this.md

> Const aliasing > Dupe this
>
> Minimal test case that, at the time of writing, would still leave an alias for the `this` alias again in the output.

## Input

`````js filename=intro
const f = function($$0) {
  const tmpPrevalAliasThis = this;
  debugger;
  tmpPrevalAliasThis.e$;
  tmpPrevalAliasThis.e$;
};
$(f);
`````

## Pre Normal


`````js filename=intro
const f = function ($$0) {
  const tmpPrevalAliasThis$1 = this;
  let $dlr_$$0 = $$0;
  debugger;
  const tmpPrevalAliasThis = tmpPrevalAliasThis$1;
  tmpPrevalAliasThis.e$;
  tmpPrevalAliasThis.e$;
};
$(f);
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  const tmpPrevalAliasThis$1 = this;
  let $dlr_$$0 = $$0;
  debugger;
  const tmpPrevalAliasThis = tmpPrevalAliasThis$1;
  tmpPrevalAliasThis.e$;
  tmpPrevalAliasThis.e$;
  return undefined;
};
$(f);
`````

## Output


`````js filename=intro
const f = function ($$0) {
  const tmpPrevalAliasThis$1 /*:object*/ = this;
  debugger;
  tmpPrevalAliasThis$1.e$;
  tmpPrevalAliasThis$1.e$;
  return undefined;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = this;
  debugger;
  b.e$;
  b.e$;
  return undefined;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
