# Preval test case

# await_arg.md

> Unroll loop with true > Await arg
>
>

## Input

`````js filename=intro
async function f() {
  const x = await $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
  $(x);
}
$(f);
`````

## Pre Normal


`````js filename=intro
let f = async function () {
  debugger;
  const x = await $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
  $(x);
};
$(f);
`````

## Normalized


`````js filename=intro
let f = async function () {
  debugger;
  const x = await true;
  $(x);
  return undefined;
};
$(f);
`````

## Output


`````js filename=intro
const f /*:()=>promise*/ = async function () {
  debugger;
  const x /*:boolean*/ = await true;
  $(x);
  return undefined;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = async function() {
  debugger;
  const b = (await (true));
  $( b );
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

Todos triggered:
- inline async functions safely (because await)