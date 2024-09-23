# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Return > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = arguments);
}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  return (a = tmpPrevalAliasArgumentsAny);
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  a = tmpPrevalAliasArgumentsAny;
  return a;
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const f /*:()=>*/ = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  a = tmpPrevalAliasArgumentsAny;
  return tmpPrevalAliasArgumentsAny;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = function() {
  const c = d;
  debugger;
  a = c;
  return c;
};
const e = b();
$( e );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
