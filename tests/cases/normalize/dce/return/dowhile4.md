# Preval test case

# dowhile4.md

> Normalize > Dce > Return > Dowhile4
>
> Regression would trip in phase1 after botched transform

## Input

`````js filename=intro
const f = function() {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const t = $(1, `return`);
    return t;
  }
  return undefined;
};
const s = f();
$(s);
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const t = $(1, `return`);
    return t;
  }
  return undefined;
};
const s = f();
$(s);
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const t = $(1, `return`);
    return t;
  }
  return undefined;
};
const s = f();
$(s);
`````

## Output


`````js filename=intro
const t = $(1, `return`);
$(t);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1, "return" );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'return'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
