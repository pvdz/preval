# Preval test case

# base_simple.md

> Await > Base simple
>
> The arguments to await should be ok when simple

## Input

`````js filename=intro
async function f() {
  await $;
}
f();
`````

## Pre Normal


`````js filename=intro
let f = async function () {
  debugger;
  await $;
};
f();
`````

## Normalized


`````js filename=intro
let f = async function () {
  debugger;
  await $;
  return undefined;
};
f();
`````

## Output


`````js filename=intro
const f /*:()=>promise*/ = async function () {
  debugger;
  await $;
  return undefined;
};
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = async function() {
  debugger;
  (await ($));
  return undefined;
};
a();
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
