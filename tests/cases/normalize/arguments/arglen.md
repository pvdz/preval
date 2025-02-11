# Preval test case

# arglen.md

> Normalize > Arguments > Arglen
>
> This was causing a problem when arguments was passed on in a call.

## Input

`````js filename=intro
function f() {
  f.apply(this, arguments.length);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  f.apply(tmpPrevalAliasThis, tmpPrevalAliasArgumentsLen);
};
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  f.apply(tmpPrevalAliasThis, tmpPrevalAliasArgumentsLen);
  return undefined;
};
`````

## Output


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  debugger;
  f.apply(tmpPrevalAliasThis, tmpPrevalAliasArgumentsLen);
  return undefined;
};
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  const c = d.length;
  debugger;
  a.apply( b, c );
  return undefined;
};
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
