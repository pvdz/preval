# Preval test case

# ident.md

> Unroll loop with true > Ident
>
>

## Input

`````js filename=intro
let f = function (a) {
  [...$LOOP_DONE_UNROLLING_ALWAYS_TRUE];
  return undefined;
};
f();
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  [...$LOOP_DONE_UNROLLING_ALWAYS_TRUE];
  return undefined;
};
f();
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  [...$LOOP_DONE_UNROLLING_ALWAYS_TRUE];
  return undefined;
};
f();
`````

## Output


`````js filename=intro
[...$LOOP_DONE_UNROLLING_ALWAYS_TRUE];
`````

## PST Output

With rename=true

`````js filename=intro
[ ...$LOOP_DONE_UNROLLING_ALWAYS_TRUE ];
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
