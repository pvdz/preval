# Preval test case

# arglen2.md

> Normalize > Arguments > Arglen2
>
> This was causing a problem when arguments was passed on in a call.

#TODO

## Input

`````js filename=intro
function f() {
  $(arguments.length);
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  $(arguments.length);
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  $(tmpPrevalAliasArgumentsLen);
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  const tmpPrevalAliasArgumentsLen = arguments.length;
  $(tmpPrevalAliasArgumentsLen);
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
