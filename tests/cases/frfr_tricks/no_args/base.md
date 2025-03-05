# Preval test case

# base.md

> Frfr tricks > No args > Base
>
> $frfr with no args can be resolved

## Input

`````js filename=intro
const f = function $free() {
  const one = 100 + '5';
  const two = one.slice(1);
  return two;
}

const r = $frfr(f);
const t = r.repeat(2)
$(t);
`````

## Pre Normal


`````js filename=intro
const f = function $free() {
  debugger;
  const one = 100 + `5`;
  const two = one.slice(1);
  return two;
};
const r = $frfr(f);
const t = r.repeat(2);
$(t);
`````

## Normalized


`````js filename=intro
const f = function $free() {
  debugger;
  const one = `1005`;
  const two = one.slice(1);
  return two;
};
const r = $frfr(f);
const t = r.repeat(2);
$(t);
`````

## Output


`````js filename=intro
const t /*:string*/ = `005`.repeat(2);
$(t);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "005".repeat( 2 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '005005'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
