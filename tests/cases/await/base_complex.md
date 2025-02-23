# Preval test case

# base_complex.md

> Await > Base complex
>
> The arguments to await should be normalized when complex

## Input

`````js filename=intro
async function f() {
  await $();
}
f();
`````

## Pre Normal


`````js filename=intro
let f = async function () {
  debugger;
  await $();
};
f();
`````

## Normalized


`````js filename=intro
let f = async function () {
  debugger;
  const tmpAwaitArg = $();
  await tmpAwaitArg;
  return undefined;
};
f();
`````

## Output


`````js filename=intro
const f /*:()=>promise*/ = async function () {
  debugger;
  const tmpAwaitArg /*:unknown*/ = $();
  await tmpAwaitArg;
  return undefined;
};
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = async function() {
  debugger;
  const b = $();
  (await (b));
  return undefined;
};
a();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
