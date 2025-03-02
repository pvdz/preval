# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Param default > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = arguments)) {}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = tmpPrevalAliasArgumentsAny) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = tmpPrevalAliasArgumentsAny;
    p = tmpPrevalAliasArgumentsAny;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const f /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  a = tmpPrevalAliasArgumentsAny;
  return undefined;
};
f();
$(undefined);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = function($$0 ) {
  const c = d;
  debugger;
  a = c;
  return undefined;
};
b();
$( undefined );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
